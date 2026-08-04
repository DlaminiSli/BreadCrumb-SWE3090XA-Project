const Price = require("../models/Price");

// GET ALL PRICES
const getPrices = async (req, res) => {
  try {
    const prices = await Price.find();

    const formattedPrices = prices.map((price) => ({
      ...price.toObject(),

      amount: `E${price.amount.toFixed(2)}`,

      dateUpdated: price.dateUpdated.toISOString().split("T")[0],
    }));

    res.status(200).json(formattedPrices);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET PRODUCT PRICES
const getProductPrices = async (req, res) => {
  try {
    const productName = decodeURIComponent(req.params.productName);

    const prices = await Price.find({
      productName: {
        $regex: productName,
        $options: "i",
      },
    }).sort({ amount: 1 });

    if (!prices.length) {
      return res.status(404).json({
        success: false,
        message: "Product not found.",
      });
    }

    const formattedPrices = prices.map((price) => ({
      ...price.toObject(),

      amount: `E${price.amount.toFixed(2)}`,

      dateUpdated: price.dateUpdated.toISOString().split("T")[0],
    }));

    res.status(200).json(formattedPrices);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// COMPARE PRICES
const comparePrices = async (req, res) => {
  try {
    const productName = decodeURIComponent(req.params.productName);

    console.log("Searching for:", productName);

    const prices = await Price.find({
      productName: {
        $regex: productName,
        $options: "i",
      },
    }).sort({ amount: 1 });

    console.log(prices);

    if (!prices.length) {
      return res.status(404).json({
        success: false,
        message: "No prices found.",
      });
    }

    const lowest = prices[0];
    const highest = prices[prices.length - 1];

    const average =
      prices.reduce((sum, item) => sum + item.amount, 0) / prices.length;

    const formattedStores = prices.map((price) => ({
      store: price.storeName,

      price: price.amount.toFixed(2),

      stock: "In Stock",

      bestDeal: price.storeName === lowest.storeName,
    }));

    res.json({
      product: productName,

      bestStore: lowest.storeName,

      lowestPrice: `E${lowest.amount.toFixed(2)}`,

      highestPrice: `E${highest.amount.toFixed(2)}`,

      averagePrice: `E${average.toFixed(2)}`,

      savings: `E${(highest.amount - lowest.amount).toFixed(2)}`,

      stores: formattedStores,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// PRICE DROPS
const getPriceDrops = async (req, res) => {
  try {
    const prices = await Price.find().sort({ amount: 1 }).limit(4);

    res.json(prices);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// COMPARE SMART BASKET
const compareBasket = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No products selected.",
      });
    }

    const maximumSavings = [];
    let maximumTotal = 0;

    for (const product of products) {
      const prices = await Price.find({
        productName: {
          $regex: product.name,
          $options: "i",
        },
      }).sort({ amount: 1 });

      if (!prices.length) continue;

      const cheapest = prices[0];

      maximumSavings.push({
        product: product.name,

        store: cheapest.storeName,

        price: cheapest.amount,
      });

      maximumTotal += cheapest.amount;

      console.log(
        `Cheapest ${product.name}: ${cheapest.storeName} = E${cheapest.amount}`,
      );

      console.log(
        product.name,
        "Estimated:",
        product.estimatedPrice,
        "Database:",
        cheapest.amount,
      );
    }

    const groupedStores = [];

    maximumSavings.forEach((item) => {
      const existing = groupedStores.find(
        (store) => store.store === item.store,
      );

      if (existing) {
        existing.items.push(item);
      } else {
        groupedStores.push({
          store: item.store,

          items: [item],
        });
      }
    });

    const stores = [
      "Boxer",
      "Shoprite",
      "SPAR",
      "Pick n Pay",
      "OK Foods",
      "Woolworths",
    ];

    let oneStore = null;

    const rankings = [];

    for (const store of stores) {
      let total = 0;

      let canSupplyAll = true;

      for (const product of products) {
        const price = await Price.findOne({
          storeName: store,

          productName: {
            $regex: product.name,
            $options: "i",
          },
        });

        if (!price) {
          console.log(
            `❌ Store "${store}" is missing product "${product.name}"`,
          );

          canSupplyAll = false;
          break;
        }

        total += price.amount;

        console.log(`${store}: ${product.name} = E${price.amount}`);
      }

      if (!canSupplyAll) continue;

      console.log(`${store} TOTAL = E${total}`);

      rankings.push({
        store,
        total,
      });

      if (!oneStore || total < oneStore.total) {
        oneStore = {
          selectedStore: store,

          total,
        };
      }
    }

    rankings.sort((a, b) => a.total - b.total);

    const budget = Number(req.body.budget || 0);

    const maximumSavingsResult = {
      total: maximumTotal,

      budgetRemaining: 0,

      groupedStores,
    };

    const oneStoreResult = oneStore
      ? {
          ...oneStore,

          budgetRemaining: budget - oneStore.total,

          rankings,
        }
      : null;
    let recommended = "maximum";

    if (oneStoreResult) {
      recommended =
        maximumSavingsResult.budgetRemaining > oneStoreResult.budgetRemaining
          ? "maximum"
          : "singleStore";
    }

    maximumSavingsResult.budgetRemaining = budget - maximumSavingsResult.total;

    if (oneStoreResult) {
      oneStoreResult.budgetRemaining = budget - oneStoreResult.total;
    }

    console.log("Maximum Savings:", maximumSavingsResult);
    console.log("One Store:", oneStoreResult);
    res.json({
      oneStore: oneStoreResult,

      maximumSavings: maximumSavingsResult,

      recommended,
      oneStoreAvailable: oneStoreResult !== null,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ESTIMATE SMART BASKET
const estimateBasket = async (req, res) => {
  try {
    const { products } = req.body;

    if (!products || products.length === 0) {
      return res.json({
        estimatedTotal: 0,
      });
    }

    let estimatedTotal = 0;

    for (const product of products) {
      const cheapest = await Price.findOne({
        productName: {
          $regex: product.name,
          $options: "i",
        },
      }).sort({ amount: 1 });

      if (cheapest) {
        estimatedTotal += cheapest.amount;
      }
    }

    res.json({
      estimatedTotal,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getPrices,
  getProductPrices,
  comparePrices,
  getPriceDrops,
  estimateBasket,
  compareBasket,
};
