const Store = require("../models/Store");

// GET ALL STORES
const getStores = async (req, res) => {
  try {
    const stores = await Store.find();

    res.status(200).json(stores);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  getStores,
};
