module.exports = (sequelize, Sequelize) => {
  const Goods = sequelize.define("goods", {
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    article: {
      type: Sequelize.STRING,
      allowNull: false
    },
    certificate: {
      type: Sequelize.INTEGER
    },
    description: {
      type: Sequelize.STRING
    }
  });

  return Goods;
};
