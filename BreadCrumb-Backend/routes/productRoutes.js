const express = require("express");

const router = express.Router();

const {
    getProducts,
    searchProducts,
    getProductsByCategory
} = require("../controllers/productController");


// GET ALL PRODUCTS
router.get("/", getProducts);
router.get("/category/:category", getProductsByCategory);
router.get("/search", searchProducts);

module.exports = router;