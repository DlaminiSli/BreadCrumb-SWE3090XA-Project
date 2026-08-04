const mongoose = require("mongoose");

const storeSchema = new mongoose.Schema({

    StoreID:{
        type:Number,
        required:true,
        unique:true
    },

    StoreName:{
        type:String,
        required:true
    },

    StoreType:{
        type:String,
        required:true
    },

    Location:{
        type:String,
        required:true
    }

});

module.exports = mongoose.model("Store",storeSchema);