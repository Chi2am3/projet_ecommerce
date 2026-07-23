const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Product = sequelize.define("Product", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  variety: DataTypes.STRING,
  roast: DataTypes.STRING,
  origin: DataTypes.STRING,
  description: DataTypes.TEXT,
  price: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  weight: DataTypes.INTEGER,
  stock: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  image: DataTypes.STRING,
});

module.exports = Product;
