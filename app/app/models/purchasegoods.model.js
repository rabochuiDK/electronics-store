module.exports = (sequelize, Sequelize) => {
  const PurchaseGoods = sequelize.define("purchasegoods", {
    qty: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    }
  });

  return PurchaseGoods;
};
