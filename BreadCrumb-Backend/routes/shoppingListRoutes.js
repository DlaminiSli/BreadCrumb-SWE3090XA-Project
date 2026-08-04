const express = require("express");

const router = express.Router();

const {

    getShoppingLists,

    createShoppingList,

    getShoppingList,

    deleteShoppingList,

    addProduct,

    removeProduct,

    archiveShoppingList,

    reuseShoppingList,

    increaseQuantity,

    decreaseQuantity,

    togglePurchased

} = require("../controllers/shoppingListController");

// GET ALL LISTS
router.get("/", getShoppingLists);

// CREATE LIST
router.post("/", createShoppingList);

// GET ONE LIST
router.get("/:id", getShoppingList);

// DELETE LIST
router.delete("/:id", deleteShoppingList);

// ADD PRODUCT
router.post("/:id/items", addProduct);

//REMOVE PRODUCT
router.delete("/:id/items/:itemId", removeProduct);

//ARCHIVE
router.patch("/:id/archive", archiveShoppingList);

//REUSE
router.patch("/:id/reuse", reuseShoppingList);

//INCREASE QUANTITY
router.patch("/:id/items/:itemId/increase", increaseQuantity);

//DECREASE
router.patch("/:id/items/:itemId/decrease", decreaseQuantity);

//TICKBOX
router.patch("/:id/items/:itemId/toggle", togglePurchased);

module.exports = router;