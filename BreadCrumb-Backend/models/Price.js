const mongoose = require("mongoose");

const priceSchema = new mongoose.Schema({

    productName:{
        type:String,
        required:true
    },

    storeName:{
        type:String,
        required:true
    },

    amount:{
        type:Number,
        required:true
    },

    normalPrice:{
        type:Number,
        required:true
    },

    saving:{
        type:Number,
        default:0
    },

    dealType:{
        type:String,
        default:"Price Drop"
    },

    catalogue:{
        type:String,
        default:"Weekly Specials"
    },

    validUntil:{
        type:Date
    },

    stock:{
        type:String,
        default:"In Stock"
    },

    featured:{
        type:Boolean,
        default:false
    },

    dateUpdated:{
        type:Date,
        default:Date.now
    }

});

module.exports = mongoose.model("Price",priceSchema);