const express = require("express");
const router = express.Router();
const { Product } = require("../models");

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll(); //équivalent SELECT * FROM Products
    res.json(products);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération des produits." });
  }
});

module.exports = router;
