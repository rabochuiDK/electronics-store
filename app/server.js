require("dotenv").config();

const express = require("express");
const cors = require("cors");

const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// конфигурация Swagger
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API интернет-магазина электроники",
      version: "1.0.0",
      description: "Учебный проект по дисциплине «Базы данных»"
    },
    servers: [
      {
        url: "http://localhost:8080"
      }
    ]
  },
  apis: ["./app/routes/*.js"]
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to electronics-store application." });
});

const db = require("./app/models");
db.sequelize.sync()
  .then(() => {
    console.log("Synced db.");
  })
  .catch((err) => {
    console.log("Failed to sync db: " + err.message);
  });

// маршруты API
require("./app/routes/goodsgroup.routes.js")(app);
require("./app/routes/goods.routes.js")(app);

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});