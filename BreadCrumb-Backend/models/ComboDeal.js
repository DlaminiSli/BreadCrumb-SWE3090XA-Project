const mongoose = require("mongoose");

const comboDealSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    store: {
        type: String,
        required: true
    },

    products: [{
        type: String
    }],

    oldPrice: Number,

    newPrice: Number,

    save: Number,

    expiry: String,

    image: String

});

module.exports = mongoose.model("ComboDeal", comboDealSchema);