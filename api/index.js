const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { Sequelize, Model, DataTypes } = require("sequelize");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;

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
  apis: ["./api/index.js"],
};

const specs = swaggerJsdoc(options);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../db/main.sqlite",
});

class Brand extends Model {}
class Part extends Model {}

Brand.init(
  {
    id: { type: DataTypes.NUMBER, primaryKey: true },
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize, modelName: "brand" }
);
Part.init(
  {
    id: { type: DataTypes.NUMBER, primaryKey: true },
    brandId: DataTypes.NUMBER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize, modelName: "part" }
);

sequelize.sync();

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

/**
 * @swagger
 * /reset-tables:
 *   post:
 *     summary: Reset the database tables
 *     description: Executes the SQL file to drop and recreate the tables.
 *     responses:
 *       200:
 *         description: Tables reset successfully
 *       500:
 *         description: Error resetting tables
 */
app.post("/reset-tables", async (req, res) => {
  try {
    await sequelize.drop();
    await sequelize.sync();
    res.status(200).send({ message: "Tables reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error resetting tables" });
  }
});

/**
 * @swagger
 * tags:
 *   name: Parts
 *   description: API to handle car's parts
 *
 * /parts/all:
 *   get:
 *     summary: Returns a list of all the car's parts available
 *     tags: [Parts]
 *     responses:
 *       200:
 *         description: Returns a list of all the car's parts available
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Part'
 * /parts/create:
 *   post:
 *     summary: Create a new car's part
 *     tags: [Parts]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Part'
 *     responses:
 *       200:
 *         description: Returns a list of all the car's parts available
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Part'
 *
 * /parts/{id}:
 *   get:
 *     summary: Returns a single car part by ID
 *     tags: [Parts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car part to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns the car part
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Part'
 *   delete:
 *     summary: Deletes a car part by ID
 *     tags: [Parts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car part to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Part deleted successfully
 *   patch:
 *     summary: Updates a car part by ID
 *     tags: [Parts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car part to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Part'
 *     responses:
 *       200:
 *         description: Returns the updated car part
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Part'
 *   put:
 *     summary: Replaces a car part by ID
 *     tags: [Parts]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car part to replace
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Part'
 *     responses:
 *       200:
 *         description: Returns the replaced car part
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Part'
 *
 * @swagger
 * components:
 *   schemas:
 *     Part:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the part
 *         brandId:
 *           type: integer
 *           description: The ID of the brand associated with the part
 *         name:
 *           type: string
 *           description: The name of the car part
 *         description:
 *           type: string
 *           description: A description of the car part
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the part was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the part was last updated
 *       required:
 *         - name
 *
 */

app.get("/parts/all", async (req, res) => {
  const parts = await Part.findAll();
  res.json(parts);
});

app.post("/parts/create", async (req, res) => {
  const newPart = await Part.create(req.body);
  const parts = await Part.findAll();
  res.json(parts);
});

app.get("/parts/:id", async (req, res) => {
  const part = await Part.findByPk(req.params.id);
  if (part) {
    res.json(part);
  } else {
    res.status(404).send("Part not found");
  }
});

app.delete("/parts/:id", async (req, res) => {
  const result = await Part.destroy({ where: { id: req.params.id } });
  if (result) {
    res.status(204).send();
  } else {
    res.status(404).send("Part not found");
  }
});

app.patch("/parts/:id", async (req, res) => {
  const [updated] = await Part.update(req.body, {
    where: { id: req.params.id },
  });
  if (updated) {
    const updatedPart = await Part.findByPk(req.params.id);
    res.json(updatedPart);
  } else {
    res.status(404).send("Part not found");
  }
});

app.put("/parts/:id", async (req, res) => {
  const [updated] = await Part.update(req.body, {
    where: { id: req.params.id },
  });
  if (updated) {
    const updatedPart = await Part.findByPk(req.params.id);
    res.json(updatedPart);
  } else {
    res.status(404).send("Part not found");
  }
});

/**
 * @swagger
 * components:
 *   schemas:
 *     Brand:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: The unique identifier for the brand
 *         name:
 *           type: string
 *           description: The name of the car brand
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the brand was created
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: The date and time when the brand was last updated
 *       required:
 *         - name
 * tags:
 *   name: Brands
 *   description: API to handle car's parts
 *
 * /brands/all:
 *   get:
 *     summary: Returns a list of all the car's brands available
 *     tags: [Brands]
 *     responses:
 *       200:
 *         description: Returns a list of all the car's brands available
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 * /brands/create:
 *   post:
 *     summary: Create a new car's brand
 *     tags: [Brands]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *     responses:
 *       200:
 *         description: Returns a list of all the car's brands available
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Brand'
 *
 * /brands/{id}:
 *   get:
 *     summary: Returns a single car brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car brand to retrieve
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Returns the car brand
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *   delete:
 *     summary: Deletes a car brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car brand to delete
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Brand deleted successfully
 *   patch:
 *     summary: Updates a car brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car brand to update
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *     responses:
 *       200:
 *         description: Returns the updated car brand
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 *   put:
 *     summary: Replaces a car brand by ID
 *     tags: [Brands]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the car brand to replace
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Brand'
 *     responses:
 *       200:
 *         description: Returns the replaced car brand
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Brand'
 */

app.get("/brands/all", async (req, res) => {
  const brands = await Brand.findAll();
  res.json(brands);
});

app.post("/brands/create", async (req, res) => {
  const newBrand = await Brand.create(req.body);
  console.log(newBrand, req.body);
  const brands = await Brand.findAll();
  res.json(brands);
});

app.get("/brands/:id", async (req, res) => {
  const brand = await Brand.findByPk(req.params.id);
  if (brand) {
    res.json(brand);
  } else {
    res.status(404).send("Brand not found");
  }
});

app.delete("/brands/:id", async (req, res) => {
  const result = await Brand.destroy({ where: { id: req.params.id } });
  if (result) {
    res.status(204).send();
  } else {
    res.status(404).send("Brand not found");
  }
});

app.patch("/brands/:id", async (req, res) => {
  const [updated] = await Brand.update(req.body, {
    where: { id: req.params.id },
  });
  if (updated) {
    const updatedBrand = await Brand.findByPk(req.params.id);
    res.json(updatedBrand);
  } else {
    res.status(404).send("Brand not found");
  }
});

app.put("/brands/:id", async (req, res) => {
  const [updated] = await Brand.update(req.body, {
    where: { id: req.params.id },
  });
  if (updated) {
    const updatedBrand = await Brand.findByPk(req.params.id);
    res.json(updatedBrand);
  } else {
    res.status(404).send("Brand not found");
  }
});

app.get("/", function (req, res) {
  res.send({ message: "Welcome to Taco Motor API!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
