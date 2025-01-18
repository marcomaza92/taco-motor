const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Taco Motor API Documentation",
      version: "0.0.1",
      description: "Taco Motor API Documentation",
    },
    servers: [
      {
        url: "https://taco-motor.vercel.app/",
      },
      {
        url: "http://localhost:4000",
      },
    ],
  },
  apis: ["./api/*.js"],
};

const specs = swaggerJsdoc(options);

module.exports = {
  specs,
  swaggerUi,
};
