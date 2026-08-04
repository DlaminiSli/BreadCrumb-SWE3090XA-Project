const mongoose = require("mongoose");

const catalogueSchema = new mongoose.Schema({

    store: {

        type: String,

        required: true

    },

    validUntil: {

        type: String,

        required: true

    },

    image: {

        type: String,

        required: true

    }

});

module.exports = mongoose.model("Catalogue", catalogueSchema);