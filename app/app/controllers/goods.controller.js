const db = require("../models");
const Goods = db.goods;
const Sequelize = db.Sequelize;
const QueryTypes = Sequelize.QueryTypes;
const Op = Sequelize.Op;

// Создание нового товара
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Поле name не может быть пустым!" });
    return;
  }

  const goods = {
    name: req.body.name,
    article: req.body.article,
    certificate: req.body.certificate,
    description: req.body.description,
    goodsgroupId: req.body.goodsgroupId
  };

  Goods.create(goods)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ошибка при создании товара."
      });
    });
};

// Получение всех товаров
exports.findAll = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  Goods.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ошибка при получении товаров."
      });
    });
};

// Получение одного товара по идентификатору
exports.findOne = (req, res) => {
  const id = req.params.id;

  Goods.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Товар с id=${id} не найден.` });
      }
    })
    .catch(() => {
      res.status(500).send({ message: `Ошибка при получении товара с id=${id}.` });
    });
};

// Обновление товара по идентификатору
exports.update = (req, res) => {
  const id = req.params.id;

  Goods.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Товар успешно обновлён." });
      } else {
        res.send({ message: `Невозможно обновить товар с id=${id}.` });
      }
    })
    .catch(() => {
      res.status(500).send({ message: `Ошибка при обновлении товара с id=${id}.` });
    });
};

// Удаление товара по идентификатору
exports.delete = (req, res) => {
  const id = req.params.id;

  Goods.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Товар успешно удалён." });
      } else {
        res.send({ message: `Товар с id=${id} не найден.` });
      }
    })
    .catch(() => {
      res.status(500).send({ message: `Ошибка при удалении товара с id=${id}.` });
    });
};

// Удаление всех товаров
exports.deleteAll = (req, res) => {
  Goods.destroy({ where: {}, truncate: false })
    .then((nums) => {
      res.send({ message: `Удалено товаров: ${nums}.` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ошибка при удалении товаров."
      });
    });
};

// Название группы товаров для товара с заданным идентификатором
exports.getGoodsGroupName = (req, res) => {
  const id = req.params.id;

  db.sequelize
    .query(
      `SELECT gg.name AS goodsgroupname
       FROM goodsgroups gg
       LEFT JOIN goods g ON gg.id = g.goodsgroup_id
       WHERE g.id = ${id}`,
      { type: QueryTypes.SELECT }
    )
    .then((data) => {
      if (data.length > 0) {
        res.send(data[0]);
      } else {
        res.status(404).send({ message: `Товар с id=${id} не найден.` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ошибка при выполнении запроса."
      });
    });
};

// Вся запись о группе товаров для товара с заданным идентификатором
exports.getGoodsGroup = (req, res) => {
  const id = req.params.id;

  db.sequelize
    .query(
      `SELECT gg.*
       FROM goodsgroups gg
       LEFT JOIN goods g ON gg.id = g.goodsgroup_id
       WHERE g.id = ${id}`,
      {
        type: QueryTypes.SELECT,
        model: db.goodsgroups,
        mapToModel: true
      }
    )
    .then((data) => {
      if (data.length > 0) {
        res.send(data[0]);
      } else {
        res.status(404).send({ message: `Товар с id=${id} не найден.` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ошибка при выполнении запроса."
      });
    });
};

// Вся запись о группе товаров через параметры замещения
exports.getGoodsGroupParam = (req, res) => {
  const id = req.params.id;

  db.sequelize
    .query(
      "SELECT gg.* FROM goodsgroups gg LEFT JOIN goods g ON gg.id = g.goodsgroup_id WHERE g.id = :goodsId",
      {
        replacements: { goodsId: id },
        type: QueryTypes.SELECT,
        model: db.goodsgroups,
        mapToModel: true
      }
    )
    .then((data) => {
      if (data.length > 0) {
        res.send(data[0]);
      } else {
        res.status(404).send({ message: `Товар с id=${id} не найден.` });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ошибка при выполнении запроса."
      });
    });
};

// Собственный запрос 1: количество товаров в группе
exports.countGoodsInGroup = (req, res) => {
  const id = req.params.id;

  db.sequelize
    .query(
      "SELECT gg.name AS goodsgroupname, COUNT(g.id)::int AS goods_count " +
        "FROM goodsgroups gg LEFT JOIN goods g ON gg.id = g.goodsgroup_id " +
        "WHERE gg.id = :groupId GROUP BY gg.name",
      { replacements: { groupId: id }, type: QueryTypes.SELECT }
    )
    .then((data) => res.send(data[0] || {}))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Собственный запрос 2: суммарная стоимость товаров в продаже
exports.getPurchaseTotal = (req, res) => {
  const id = req.params.id;

  db.sequelize
    .query(
      "SELECT p.id, p.status, SUM(pg.qty * pg.price)::numeric(10,2) AS total_amount " +
        "FROM purchases p JOIN purchasegoods pg ON pg.purchase_id = p.id " +
        "WHERE p.id = :purchaseId GROUP BY p.id, p.status",
      { replacements: { purchaseId: id }, type: QueryTypes.SELECT }
    )
    .then((data) => res.send(data[0] || {}))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Собственный запрос 3: товары с ценой из списка цен
exports.getPriceListGoods = (req, res) => {
  const id = req.params.id;

  db.sequelize
    .query(
      "SELECT g.name AS goods_name, pg.price " +
        "FROM pricelistgoods pg JOIN goods g ON g.id = pg.goods_id " +
        "WHERE pg.pricelist_id = :priceListId ORDER BY g.name",
      { replacements: { priceListId: id }, type: QueryTypes.SELECT }
    )
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Собственный запрос 4: средняя цена товаров по группам
exports.getAvgPriceByGroup = (req, res) => {
  db.sequelize
    .query(
      "SELECT gg.name AS goodsgroupname, AVG(pg.price)::numeric(10,2) AS avg_price " +
        "FROM goodsgroups gg " +
        "JOIN goods g ON g.goodsgroup_id = gg.id " +
        "JOIN pricelistgoods pg ON pg.goods_id = g.id " +
        "GROUP BY gg.name ORDER BY avg_price DESC",
      { type: QueryTypes.SELECT }
    )
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};

// Собственный запрос 5: товары, которых нет ни в одной продаже
exports.getUnsoldGoods = (req, res) => {
  db.sequelize
    .query(
      "SELECT g.id, g.name, g.article " +
        "FROM goods g LEFT JOIN purchasegoods pg ON pg.goods_id = g.id " +
        "WHERE pg.goods_id IS NULL ORDER BY g.id",
      { type: QueryTypes.SELECT }
    )
    .then((data) => res.send(data))
    .catch((err) => res.status(500).send({ message: err.message }));
};
// Постраничная выгрузка списка товаров
exports.findAllPaged = (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const size = parseInt(req.query.size) || 10;
  const offset = (page - 1) * size;

  Goods.findAndCountAll({ limit: size, offset: offset, order: [["id", "ASC"]] })
    .then((data) => {
      res.send({
        total: data.count,
        page: page,
        size: size,
        rows: data.rows
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ошибка при получении страницы товаров."
      });
    });
};
