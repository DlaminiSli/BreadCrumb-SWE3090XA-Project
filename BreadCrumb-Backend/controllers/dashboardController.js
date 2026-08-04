const Product = require("../models/Product");
const Price = require("../models/Price");
const Store = require("../models/Store");

const getDashboard = async (req, res) => {
  try {
    // Latest products
    const products = await Product.find().limit(8);

    // Lowest prices
    const prices = await Price.find().sort({ amount: 1 }).limit(8);

    // Stores
    const stores = await Store.find();

    res.status(200).json({
      featuredProducts: products,

      cheapestPrices: prices,

      stores,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {
  getDashboard,
};
