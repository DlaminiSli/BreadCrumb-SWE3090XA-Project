const mongoose = require("mongoose");

const shoppingListSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    name: {
      type: String,

      required: true,
    },

    category: {
      type: String,

      default: "Groceries",
    },

    budget: {
      type: Number,

      default: 0,
    },

    budgetCurrency: {
      type: String,
      default: "Eswatini",
    },

    shoppingDate: {
      type: String,

      default: "",
    },

    shareList: {
      type: Boolean,

      default: false,
    },

    completed: {
      type: Boolean,

      default: false,
    },

    archived: {
      type: Boolean,

      default: false,
    },

    archivedDate: {
      type: String,

      default: "",
    },

    completedDate: {
      type: String,

      default: "",
    },

    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,

          ref: "Product",
        },

        name: String,

        quantity: {
          type: Number,

          default: 1,
        },

        price: {
          type: Number,

          default: 0,
        },

        savings: {
          type: Number,

          default: 0,
        },

        store: String,

        purchased: {
          type: Boolean,

          default: false,
        },
      },
    ],
  },

  {
    timestamps: true,
  },
);

module.exports = mongoose.model(

    "ShoppingList",

    shoppingListSchema

);