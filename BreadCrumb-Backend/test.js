require("dotenv").config();
const mongoose = require("mongoose");

async function testConnection() {
  console.log("URI loaded:", process.env.MONGODB_URI ? "YES" : "NO");

  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ Connected!");
    console.log(conn.connection.host);
  } catch (err) {
    console.error("FULL ERROR:");
    console.error(err);
  }
}

testConnection();