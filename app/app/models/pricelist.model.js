module.exports = (sequelize, Sequelize) => {
  const PriceList = sequelize.define("pricelist", {
    category: {
      type: Sequelize.STRING,
      allowNull: false
    },
    plDate: {
      type: Sequelize.DATE,
      allowNull: false
    }
  });

  return PriceList;
};
