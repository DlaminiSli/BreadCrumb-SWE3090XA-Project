const express = require("express");

const router = express.Router();

const {
    getPrices,
    getProductPrices,
    comparePrices,
    getPriceDrops,
    estimateBasket,
    compareBasket
} = require("../controllers/priceController");


router.get("/product/:productName", getProductPrices);
router.get("/compare/:productName", comparePrices);
router.get("/", getPrices);
router.get("/drops", getPriceDrops);

router.post("/estimate-basket", estimateBasket);
router.post("/compare-basket", compareBasket);

module.exports = router;