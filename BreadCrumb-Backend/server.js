const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const productRoutes = require("./routes/productRoutes");
const storeRoutes = require("./routes/storeRoutes");
const priceRoutes = require("./routes/priceRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const authRoutes = require("./routes/authRoutes");
const dealsRoutes = require("./routes/dealsRoutes");
const catalogueRoutes = require("./routes/catalogueRoutes");
const shoppingListRoutes = require("./routes/shoppingListRoutes");
const alertRoutes = require("./routes/alertRoutes");

dotenv.config();

// Connect Database
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/deals", dealsRoutes);
app.use("/api/catalogues", catalogueRoutes);
app.use("/api/shoppinglists", shoppingListRoutes);
app.use("/api/alerts", alertRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to the BreadCrumb API ",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// PRODUCTS API
app.use("/api/products", productRoutes);
app.use("/api/stores", storeRoutes);
app.use("/api/prices", priceRoutes);
app.use("/api/dashboard", dashboardRoutes);


