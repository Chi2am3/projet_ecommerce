module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define("Order", {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING, //Je le modifierai peut-être plus tard pour BOOL
      allowNull: false,
    },
  });

  Order.associate = (models) => {
    Order.belongsTo(models.User);
    Order.hasMany(models.OrderItem);
    Order.belongsToMany(models.Product, { through: models.OrderItem });
  };

  return Order;
};
