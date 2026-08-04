const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({

    ProductID:{

        type:Number,
        required:true,
        unique:true

    },

    ProductName:{

        type:String,
        required:true,
        trim:true

    },

    Category:{

        type:String,
        required:true

    },

    image:{

        type:String,
        default:""

    },

    brand:{

        type:String,
        default:""

    }

});

module.exports = mongoose.model("Product", productSchema);