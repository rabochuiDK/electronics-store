module.exports = (sequelize, Sequelize) => {
  const Purchase = sequelize.define("purchase", {
    purchaseDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    status: {
      type: Sequelize.STRING,
      allowNull: false
    },
    total: {
      type: Sequelize.DECIMAL(10, 2)
    }
  });

  return Purchase;
};
