const db = require("../models");
const GoodsGroup = db.goodsgroups;
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

// Создание новой группы товаров
exports.create = (req, res) => {
  if (!req.body.name) {
    res.status(400).send({ message: "Поле name не может быть пустым!" });
    return;
  }

  const goodsGroup = {
    name: req.body.name,
    description: req.body.description
  };

  GoodsGroup.create(goodsGroup)
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ошибка при создании группы товаров."
      });
    });
};

// Получение всех групп товаров
exports.findAll = (req, res) => {
  const name = req.query.name;
  const condition = name ? { name: { [Op.iLike]: `%${name}%` } } : null;

  GoodsGroup.findAll({ where: condition })
    .then((data) => res.send(data))
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ошибка при получении групп товаров."
      });
    });
};

// Получение одной группы товаров по идентификатору
exports.findOne = (req, res) => {
  const id = req.params.id;

  GoodsGroup.findByPk(id)
    .then((data) => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({ message: `Группа товаров с id=${id} не найдена.` });
      }
    })
    .catch(() => {
      res.status(500).send({ message: `Ошибка при получении группы товаров с id=${id}.` });
    });
};

// Обновление группы товаров по идентификатору
exports.update = (req, res) => {
  const id = req.params.id;

  GoodsGroup.update(req.body, { where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Группа товаров успешно обновлена." });
      } else {
        res.send({ message: `Невозможно обновить группу товаров с id=${id}.` });
      }
    })
    .catch(() => {
      res.status(500).send({ message: `Ошибка при обновлении группы товаров с id=${id}.` });
    });
};

// Удаление группы товаров по идентификатору
exports.delete = (req, res) => {
  const id = req.params.id;

  GoodsGroup.destroy({ where: { id: id } })
    .then((num) => {
      if (num == 1) {
        res.send({ message: "Группа товаров успешно удалена." });
      } else {
        res.send({ message: `Группа товаров с id=${id} не найдена.` });
      }
    })
    .catch(() => {
      res.status(500).send({ message: `Ошибка при удалении группы товаров с id=${id}.` });
    });
};

// Удаление всех групп товаров
exports.deleteAll = (req, res) => {
  GoodsGroup.destroy({ where: {}, truncate: false })
    .then((nums) => {
      res.send({ message: `Удалено групп товаров: ${nums}.` });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Ошибка при удалении групп товаров."
      });
    });
};