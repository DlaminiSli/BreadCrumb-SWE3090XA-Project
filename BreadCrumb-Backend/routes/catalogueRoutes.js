const express = require("express");

const router = express.Router();

const {

    getCatalogues

} = require("../controllers/catalogueController");

router.get("/", getCatalogues);

module.exports = router;