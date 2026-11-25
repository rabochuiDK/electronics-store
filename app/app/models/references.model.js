// Связи между сущностями приложения «Интернет-магазин электроники».
// Реализованы отношения «один ко многим» (hasMany / belongsTo)
// и «многие ко многим» через промежуточные таблицы pricelistgoods и purchasegoods.

module.exports = (db) => {
  // Группа товаров -> Товары
  db.goodsgroups.hasMany(db.goods, {
    foreignKey: "goodsgroupId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });
  db.goods.belongsTo(db.goodsgroups, {
    foreignKey: "goodsgroupId"
  });

  // Список цен -> Товары в списке цен (многие ко многим)
  db.pricelists.hasMany(db.pricelistgoods, {
    foreignKey: "pricelistId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });
  db.pricelistgoods.belongsTo(db.pricelists, {
    foreignKey: "pricelistId"
  });

  db.goods.hasMany(db.pricelistgoods, {
    foreignKey: "goodsId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });
  db.pricelistgoods.belongsTo(db.goods, {
    foreignKey: "goodsId"
  });

  // Продажа -> Товары в продаже (многие ко многим)
  db.purchases.hasMany(db.purchasegoods, {
    foreignKey: "purchaseId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });
  db.purchasegoods.belongsTo(db.purchases, {
    foreignKey: "purchaseId"
  });

  db.goods.hasMany(db.purchasegoods, {
    foreignKey: "goodsId",
    onDelete: "CASCADE",
    onUpdate: "CASCADE"
  });
  db.purchasegoods.belongsTo(db.goods, {
    foreignKey: "goodsId"
  });
};
