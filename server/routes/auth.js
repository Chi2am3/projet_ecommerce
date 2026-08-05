const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } }); //doc Sequelize
    if (existingUser) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "Utilisateur créé avec succès.",
      user: { id: user.id, firstName: user.firstName, email: user.email }, // on ne retourne pas le mdp
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de l'inscription." });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect." });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ message: "Email ou mot de passe incorrect." });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );

    res.json({
      message: "Connexion réussie.",
      token,
      user: { id: user.id, firstName: user.firstName, email: user.email },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erreur lors de la connexion." });
  }
});

module.exports = router;
