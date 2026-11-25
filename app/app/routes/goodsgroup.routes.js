module.exports = (app) => {
  const goodsgroups = require("../controllers/goodsgroup.controller.js");

  const router = require("express").Router();

  // Создание новой группы товаров
  router.post("/", goodsgroups.create);

  // Получение всех групп товаров
  router.get("/", goodsgroups.findAll);

  // Получение одной группы товаров по идентификатору
  router.get("/:id", goodsgroups.findOne);

  // Обновление группы товаров по идентификатору
  router.put("/:id", goodsgroups.update);

  // Удаление группы товаров по идентификатору
  router.delete("/:id", goodsgroups.delete);

  // Удаление всех групп товаров
  router.delete("/", goodsgroups.deleteAll);

  app.use("/api/goodsgroups", router);
};