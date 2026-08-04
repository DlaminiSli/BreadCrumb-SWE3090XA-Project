const Product = require("../models/Product");
const keywordMap = require("../helpers/keywordSuggestions");

// GET ALL PRODUCTS
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const searchProducts = async (req, res) => {
  try {
    const search = req.query.q?.trim();

    if (!search) {
      return res.status(400).json({
        success: false,
        message: "Search query is required.",
      });
    }

    let searchTerms = [search];

    const lower = search.toLowerCase();

    if (keywordMap[lower]) {
      searchTerms = keywordMap[lower];
    }

    const regexArray = searchTerms.map((term) => ({
      ProductName: {
        $regex: term,
        $options: "i",
      },
    }));

    const products = await Product.find({
      $or: [
        {
          ProductName: {
            $regex: search,
            $options: "i",
          },
        },

        {
          Category: {
            $regex: search,
            $options: "i",
          },
        },

        ...regexArray,
      ],
    }).sort({
      ProductName: 1,
    });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET PRODUCTS BY CATEGORY
const getProductsByCategory = async (req, res) => {
  try {
    const category = req.params.category;

    const products = await Product.find({
      Category: {
        $regex: `^${category}$`,
        $options: "i",
      },
    });

    if (!products.length) {
      return res.status(404).json({
        success: false,
        message: "No products found.",
      });
    }

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getProducts,
  searchProducts,
  getProductsByCategory,
};
