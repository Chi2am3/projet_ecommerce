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

router.get("/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    const product = await Product.findByPk(productId);

    if (!product) {
      return res.status(404).json({ message: "Produit non trouvé." });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la récupération du produit." });
  }
});
module.exports = router;
