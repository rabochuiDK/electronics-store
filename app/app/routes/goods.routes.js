module.exports = (app) => {
  const goods = require("../controllers/goods.controller.js");

  const router = require("express").Router();

  /**
   * @swagger
   * components:
   *   schemas:
   *     Goods:
   *       type: object
   *       required:
   *         - name
   *         - article
   *       properties:
   *         id:
   *           type: integer
   *           description: Идентификатор товара
   *         name:
   *           type: string
   *           description: Название товара
   *         article:
   *           type: string
   *           description: Артикул товара
   *         certificate:
   *           type: integer
   *           description: Номер сертификата
   *         description:
   *           type: string
   *           description: Описание товара
   *         goodsgroupId:
   *           type: integer
   *           description: Идентификатор группы товаров
   *       example:
   *         id: 1
   *         name: Ноутбук ASUS VivoBook
   *         article: NB-001
   *         certificate: 1
   *         goodsgroupId: 1
   */

  /**
   * @swagger
   * tags:
   *   name: Goods
   *   description: Операции с товарами интернет-магазина
   */

  /**
   * @swagger
   * /api/goods:
   *   post:
   *     summary: Создание нового товара
   *     tags: [Goods]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Goods'
   *     responses:
   *       200:
   *         description: Товар создан
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Goods'
   *       400:
   *         description: Поле name не может быть пустым
   *       500:
   *         description: Ошибка при создании товара
   */
  router.post("/", goods.create);

  /**
   * @swagger
   * /api/goods:
   *   get:
   *     summary: Получение списка всех товаров
   *     tags: [Goods]
   *     parameters:
   *       - in: query
   *         name: name
   *         schema:
   *           type: string
   *         description: Фильтр по названию товара
   *     responses:
   *       200:
   *         description: Список товаров
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 $ref: '#/components/schemas/Goods'
   *       500:
   *         description: Ошибка при получении товаров
   */
  router.get("/", goods.findAll);

  /**
   * @swagger
   * /api/goods/page:
   *   get:
   *     summary: Постраничная выгрузка списка товаров
   *     tags: [Goods]
   *     parameters:
   *       - in: query
   *         name: page
   *         schema:
   *           type: integer
   *           default: 1
   *         description: Номер страницы
   *       - in: query
   *         name: size
   *         schema:
   *           type: integer
   *           default: 10
   *         description: Размер страницы
   *     responses:
   *       200:
   *         description: Страница со списком товаров
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 total:
   *                   type: integer
   *                 page:
   *                   type: integer
   *                 size:
   *                   type: integer
   *                 rows:
   *                   type: array
   *                   items:
   *                     $ref: '#/components/schemas/Goods'
   */
  router.get("/page", goods.findAllPaged);

  /**
   * @swagger
   * /api/goods/avgprice/bygroup:
   *   get:
   *     summary: Средняя цена товаров по группам
   *     tags: [Goods]
   *     responses:
   *       200:
   *         description: Список групп со средней ценой
   */
  router.get("/avgprice/bygroup", goods.getAvgPriceByGroup);

  /**
   * @swagger
   * /api/goods/unsold:
   *   get:
   *     summary: Товары, отсутствующие в продажах
   *     tags: [Goods]
   *     responses:
   *       200:
   *         description: Список нераспроданных товаров
   */
  router.get("/unsold", goods.getUnsoldGoods);

  /**
   * @swagger
   * /api/goods/{id}:
   *   get:
   *     summary: Получение товара по идентификатору
   *     tags: [Goods]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *         description: Идентификатор товара
   *     responses:
   *       200:
   *         description: Найденный товар
   *         content:
   *           application/json:
   *             schema:
   *               $ref: '#/components/schemas/Goods'
   *       404:
   *         description: Товар не найден
   */
  router.get("/:id", goods.findOne);

  /**
   * @swagger
   * /api/goods/{id}/goodsgroupname:
   *   get:
   *     summary: Название группы товаров для товара
   *     tags: [Goods]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Название группы товаров
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 goodsgroupname:
   *                   type: string
   */
  router.get("/:id/goodsgroupname", goods.getGoodsGroupName);

  /**
   * @swagger
   * /api/goods/{id}/goodsgroup:
   *   get:
   *     summary: Запись о группе товаров для товара
   *     tags: [Goods]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Объект группы товаров
   */
  router.get("/:id/goodsgroup", goods.getGoodsGroup);

  /**
   * @swagger
   * /api/goods/{id}/goodsgroup-param:
   *   get:
   *     summary: Запись о группе товаров через параметры замещения
   *     tags: [Goods]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Объект группы товаров
   */
  router.get("/:id/goodsgroup-param", goods.getGoodsGroupParam);

  /**
   * @swagger
   * /api/goods/{id}/goodscount:
   *   get:
   *     summary: Количество товаров в группе
   *     tags: [Goods]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Название группы и количество товаров
   */
  router.get("/:id/goodscount", goods.countGoodsInGroup);

  /**
   * @swagger
   * /api/goods/{id}/purchasetotal:
   *   get:
   *     summary: Суммарная стоимость продажи
   *     tags: [Goods]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Идентификатор, статус и сумма продажи
   */
  router.get("/:id/purchasetotal", goods.getPurchaseTotal);

  /**
   * @swagger
   * /api/goods/{id}/pricelistgoods:
   *   get:
   *     summary: Товары с ценами из списка цен
   *     tags: [Goods]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Список товаров с ценами
   */
  router.get("/:id/pricelistgoods", goods.getPriceListGoods);

  /**
   * @swagger
   * /api/goods/{id}:
   *   put:
   *     summary: Обновление товара
   *     tags: [Goods]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             $ref: '#/components/schemas/Goods'
   *     responses:
   *       200:
   *         description: Товар обновлён
   */
  router.put("/:id", goods.update);

  /**
   * @swagger
   * /api/goods/{id}:
   *   delete:
   *     summary: Удаление товара
   *     tags: [Goods]
   *     parameters:
   *       - in: path
   *         name: id
   *         required: true
   *         schema:
   *           type: integer
   *     responses:
   *       200:
   *         description: Товар удалён
   */
  router.delete("/:id", goods.delete);

  /**
   * @swagger
   * /api/goods:
   *   delete:
   *     summary: Удаление всех товаров
   *     tags: [Goods]
   *     responses:
   *       200:
   *         description: Количество удалённых записей
   */
  router.delete("/", goods.deleteAll);

  app.use("/api/goods", router);
};