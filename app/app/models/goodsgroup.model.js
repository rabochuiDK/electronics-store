module.exports = (sequelize, Sequelize) => {
  const GoodsGroup = sequelize.define("goodsgroup", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    description: {
      type: Sequelize.STRING
    }
  });

  return GoodsGroup;
};
