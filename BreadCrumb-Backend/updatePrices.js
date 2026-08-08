const mongoose = require("mongoose");
const Price = require("./models/Price");
require("dotenv").config();

const connectDB = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("MongoDB Connected");
};

async function updatePrices() {
  await connectDB();

  const products = await Price.distinct("productName");

  console.log(`Updating ${products.length} products...\n`);

  for (const product of products) {
    const prices = await Price.find({ productName: product });

    if (prices.length <= 1) continue;

    // Update every other store
prices.sort((a, b) => a.amount - b.amount);

const cheapest = prices[0];

for (let i = 1; i < prices.length; i++) {
  const item = prices[i];

  const variance = Math.floor(cheapest.amount * (Math.random() * 0.15 + 0.05));

  const newPrice = cheapest.amount + variance + i;

  item.amount = newPrice;

  item.saving = Math.max(1, item.normalPrice - newPrice);

  await item.save();
}

    console.log(`✓ ${product}`);
  }

  console.log("\nFinished!");
  process.exit();
}

updatePrices();
