require("dotenv").config();
const express = require("express");
const app = express();
const port = 3001;
const { sequelize } = require("./models");
const productRoutes = require("./routes/product");
const authRoutes = require("./routes/auth");
const cors = require("cors");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

app.use(express.json());

app.use("/api/products", productRoutes); // on récupère la route

app.use("/api", authRoutes);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

testConnection();
