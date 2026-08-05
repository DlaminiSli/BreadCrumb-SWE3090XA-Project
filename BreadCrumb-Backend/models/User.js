const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  firebaseUID: {
    type: String,
    required: true,
    unique: true,
  },

  fullName: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  country: {
    type: String,
    default: "",
  },

  currency: {
    type: String,
    enum: ["SZL", "ZAR", "LSL", "KES", "BWP", "NAD", "MZN", "ZMW", "USD"],
    default: "SZL",
  },

  countryCode: {
    type: String,
    default: "",
  },

  phoneNumber: {
    type: String,
    default: "",
  },

  favourites: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
  ],

  shoppingLists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ShoppingList",
    },
  ],

  alerts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Alert",
    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", UserSchema);