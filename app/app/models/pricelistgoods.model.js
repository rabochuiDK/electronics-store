module.exports = (sequelize, Sequelize) => {
  const PriceListGoods = sequelize.define("pricelistgoods", {
    price: {
      type: Sequelize.DECIMAL(10, 2),
      allowNull: false
    }
  });

  return PriceListGoods;
};
