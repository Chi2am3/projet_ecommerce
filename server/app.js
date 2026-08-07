require("dotenv").config();
const express = require("express");
const app = express();
const port = 3001;
const { sequelize } = require("./models");
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const cors = require("cors");
const orderRoutes = require("./routes/orders");

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes); // on récupère la route
app.use("/api", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();
