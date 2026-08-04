require("dotenv").config();

const connectDB = require("../config/db");

const Product = require("../models/Product");
const Price = require("../models/Price");

const products = require("./products");
const prices = require("./prices");

async function seed() {

    try {

        await connectDB();

        console.log("Cleaning collections...");

        await Product.deleteMany();

        await Price.deleteMany();

        console.log("Adding Products...");

        await Product.insertMany(products);

        console.log("Adding Prices...");

        await Price.insertMany(prices);

        console.log(" Database successfully seeded.");

        process.exit();

    }

    catch (err) {

        console.error(err);

        process.exit(1);

    }

}

seed();