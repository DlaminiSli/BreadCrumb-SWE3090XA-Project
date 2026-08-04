const mongoose = require("mongoose");

const alertSchema = new mongoose.Schema(

    {

        user: {

            type: mongoose.Schema.Types.ObjectId,

            ref: "User",

            required: true

        },

        title: {

            type: String,

            required: true

        },

        message: {

            type: String,

            required: true

        },

        type: {

            type: String,

            enum: [

                "PRICE_DROP",

                "NEW_CATALOGUE",

                "COMBO_DEAL",

                "SHOPPING_LIST"

            ],

            required: true

        },

        isRead: {

            type: Boolean,

            default: false

        },

        deleted: {

            type: Boolean,

            default: false

        }

    },

    {

        timestamps: true

    }

);

module.exports = mongoose.model(

    "Alert",

    alertSchema

);