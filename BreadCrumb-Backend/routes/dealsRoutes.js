const express = require("express");

const router = express.Router();

const {

    getDeals

} = require("../controllers/dealsController");

router.get("/", getDeals);

module.exports = router;