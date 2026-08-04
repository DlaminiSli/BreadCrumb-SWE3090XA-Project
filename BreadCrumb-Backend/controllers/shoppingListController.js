const ShoppingList = require("../models/ShoppingList");
const PurchaseHistory = require("../models/PurchaseHistory");
const createNotification = require("../utils/createNotification");
const User = require("../models/User");

// ======================================
// GET ALL SHOPPING LISTS
// ======================================

const getShoppingLists = async (req, res) => {
  try {
    const lists = await ShoppingList.find().populate("items.product");

    res.status(200).json(lists);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// CREATE SHOPPING LIST
// ======================================

const createShoppingList = async (req, res) => {
  try {
    const {
      user,

      name,

      category,

      budget,

      shoppingDate,

      shareList,

      completed,

      archived,

      items = [],
    } = req.body;

    const shoppingList = await ShoppingList.create({
      user,

      name,

      category,

      budget,

      shoppingDate,

      shareList,

      completed,

      archived,

      items,
    });

    // Create notification
    await createNotification({
      user,

      title: "Shopping List Created",

      message: `Your shopping list "${shoppingList.name}" was created successfully.`,

      type: "SHOPPING_LIST",
    });

    res.status(201).json({
      success: true,

      shoppingList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};
// ======================================
// GET SINGLE SHOPPING LIST
// ======================================

const getShoppingList = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findById(req.params.id).populate(
      "items.product",
    );

    if (!shoppingList) {
      return res.status(404).json({
        success: false,
        message: "Shopping list not found.",
      });
    }

    res.json(shoppingList);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// DELETE SHOPPING LIST
// ======================================

const deleteShoppingList = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findByIdAndDelete(req.params.id);

    if (!shoppingList) {
      return res.status(404).json({
        success: false,
        message: "Shopping list not found.",
      });
    }

    res.json({
      success: true,
      message: "Shopping list deleted.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// ======================================
// ADD PRODUCT
// ======================================

const addProduct = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findById(req.params.id);

    if (!shoppingList) {
      return res.status(404).json({
        success: false,

        message: "Shopping list not found.",
      });
    }

    const item = {
      name: req.body.name,

      price: Number(req.body.price),

      savings: Number(req.body.savings),

      store: req.body.store,

      quantity: req.body.quantity || 1,

      purchased: false,
    };

    shoppingList.items.push(item);

    await shoppingList.save();

    res.json({
      success: true,

      shoppingList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================
// REMOVE PRODUCT
// ======================================

const removeProduct = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findById(req.params.id);

    if (!shoppingList) {
      return res.status(404).json({
        success: false,

        message: "Shopping list not found.",
      });
    }

    shoppingList.items = shoppingList.items.filter(
      (item) => item._id.toString() !== req.params.itemId,
    );

    await shoppingList.save();

    res.json({
      success: true,

      shoppingList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================
// ARCHIVE SHOPPING LIST
// ======================================

const archiveShoppingList = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findById(req.params.id);

    if (!shoppingList) {
      return res.status(404).json({
        success: false,
        message: "Shopping list not found.",
      });
    }

    // Archive only if it is not already archived
    if (!shoppingList.archived) {
      shoppingList.archived = true;
      shoppingList.archivedDate = new Date().toLocaleDateString();

      console.log("Creating Purchase History...");

      // Save a permanent copy to Purchase History
      await PurchaseHistory.create({
        user: shoppingList.user,

        shoppingListId: shoppingList._id,

        name: shoppingList.name,

        category: shoppingList.category,

        budget: shoppingList.budget,

        shoppingDate: shoppingList.shoppingDate,

        archivedDate: shoppingList.archivedDate,

        items: shoppingList.items,
      });

      console.log("Purchase History created successfully.");
    } else {
      // Unarchive normally
      shoppingList.archived = false;
      shoppingList.archivedDate = "";
    }

    await shoppingList.save();

    res.json({
      success: true,

      shoppingList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================
// REUSE SHOPPING LIST
// ======================================

const reuseShoppingList = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findById(req.params.id);

    if (!shoppingList) {
      return res.status(404).json({
        success: false,

        message: "Shopping list not found.",
      });
    }

    shoppingList.archived = false;
    shoppingList.completed = false;
    shoppingList.archivedDate = "";
    shoppingList.completedDate = "";

    // Reset every product
    shoppingList.items.forEach((item) => {
      item.purchased = false;
    });

    await shoppingList.save();

    res.json({
      success: true,

      shoppingList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================
// INCREASE QUANTITY
// ======================================

const increaseQuantity = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findById(req.params.id);

    if (!shoppingList) {
      return res.status(404).json({
        success: false,

        message: "Shopping list not found.",
      });
    }

    const item = shoppingList.items.id(req.params.itemId);

    if (!item) {
      return res.status(404).json({
        success: false,

        message: "Item not found.",
      });
    }

    item.quantity += 1;

    await shoppingList.save();

    res.json({
      success: true,

      shoppingList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================
// DECREASE QUANTITY
// ======================================

const decreaseQuantity = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findById(req.params.id);

    if (!shoppingList) {
      return res.status(404).json({
        success: false,

        message: "Shopping list not found.",
      });
    }

    const item = shoppingList.items.id(req.params.itemId);

    if (!item) {
      return res.status(404).json({
        success: false,

        message: "Item not found.",
      });
    }

    if (item.quantity > 1) {
      item.quantity -= 1;
    }

    await shoppingList.save();

    res.json({
      success: true,

      shoppingList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

// ======================================
// TOGGLE PURCHASED
// ======================================

const togglePurchased = async (req, res) => {
  try {
    const shoppingList = await ShoppingList.findById(req.params.id);

    if (!shoppingList) {
      return res.status(404).json({
        success: false,

        message: "Shopping list not found.",
      });
    }

    const item = shoppingList.items.id(req.params.itemId);

    if (!item) {
      return res.status(404).json({
        success: false,

        message: "Item not found.",
      });
    }

    item.purchased = !item.purchased;

    await shoppingList.save();

    res.json({
      success: true,

      shoppingList,
    });
  } catch (error) {
    res.status(500).json({
      success: false,

      message: error.message,
    });
  }
};

module.exports = {
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

  togglePurchased,
};
