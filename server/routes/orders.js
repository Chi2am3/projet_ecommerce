const express = require("express");
const router = express.Router();
const authenticate = require("../middleware/authenticate");
const { Order, OrderItem, Product } = require("../models");

router.post("/", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;
    const { items } = req.body; // [{ productId, quantity }]

    if (!items || items.length === 0) {
      return res.status(400).json({ message: "Le panier est vide." });
    }

    const order = await Order.create({
      userId,
      status: "pending",
    });

    for (const item of items) {
      await OrderItem.create({
        orderId: order.id,
        productId: item.productId,
        quantity: item.quantity,
      });

      await Product.decrement("stock", {
        by: item.quantity,
        where: { id: item.productId },
      });
    }

    res.status(201).json({
      message: "Commande créée avec succès.",
      orderId: order.id,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Erreur lors de la création de la commande." });
  }
});

module.exports = router;
