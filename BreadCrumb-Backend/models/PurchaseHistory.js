const mongoose = require("mongoose");

const purchaseHistorySchema = new mongoose.Schema(

    {

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },

        shoppingListId: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "ShoppingList",

            required: true

        },

        name: {

            type: String,

            required: true

        },

        category: {

            type: String,

            default: "Groceries"

        },

        budget: {

            type: Number,

            default: 0

        },

        shoppingDate: {

            type: String,

            default: ""

        },

        archivedDate: {

            type: String,

            default: ""

        },

        items: [

            {

                product: {

                    type: mongoose.Schema.Types.ObjectId,

                    ref: "Product"

                },

                name: String,

                quantity: Number,

                price: Number,

                savings: Number,

                store: String,

                purchased: Boolean

            }

        ]

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model(

    "PurchaseHistory",

    purchaseHistorySchema

);