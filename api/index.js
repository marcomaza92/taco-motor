const express = require("express");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const { createClient } = require("@supabase/supabase-js");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;

const supabaseUrl = "https://ftulzetaaqowlzdegaxu.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZ0dWx6ZXRhYXFvd2x6ZGVnYXh1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzcyMzE2NzEsImV4cCI6MjA1MjgwNzY3MX0.qj_BUxgLclGhm3zvZatTwqwOiWxJTrjODkzF3IYSkyw";
const supabase = createClient(supabaseUrl, supabaseKey);

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
const CSS_URL =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(specs, {
    customCss:
      ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
    customCssUrl: CSS_URL,
  })
);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

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
    await supabase.from("parts").delete().neq("id", 0);
    await supabase.from("brands").delete().neq("id", 0);
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
  const { data: parts, error } = await supabase.from("parts").select("*");
  if (error) return res.status(500).send(error);
  res.json(parts);
});

app.post("/parts/create", async (req, res) => {
  const { data: newPart, error } = await supabase
    .from("parts")
    .insert(req.body);
  if (error) return res.status(500).send(error);
  res.json(newPart);
});

app.get("/parts/:id", async (req, res) => {
  const { data: part, error } = await supabase
    .from("parts")
    .select("*")
    .eq("id", req.params.id)
    .single();
  if (error) return res.status(404).send("Part not found");
  res.json(part);
});

app.delete("/parts/:id", async (req, res) => {
  const { error } = await supabase
    .from("parts")
    .delete()
    .eq("id", req.params.id);
  if (error) return res.status(404).send("Part not found");
  res.status(204).send();
});

app.patch("/parts/:id", async (req, res) => {
  const { data: updatedPart, error } = await supabase
    .from("parts")
    .update(req.body)
    .eq("id", req.params.id);
  if (error) return res.status(404).send("Part not found");
  res.json(updatedPart);
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
  const { data: brands, error } = await supabase.from("brands").select("*");
  if (error) return res.status(500).send(error);
  res.json(brands);
});

app.post("/brands/create", async (req, res) => {
  const { data: newBrand, error } = await supabase
    .from("brands")
    .insert(req.body);
  if (error) return res.status(500).send(error);
  res.json(newBrand);
});

app.get("/brands/:id", async (req, res) => {
  const { data: brand, error } = await supabase
    .from("brands")
    .select("*")
    .eq("id", req.params.id)
    .single();
  if (error) return res.status(404).send("Brand not found");
  res.json(brand);
});

app.delete("/brands/:id", async (req, res) => {
  const { error } = await supabase
    .from("brands")
    .delete()
    .eq("id", req.params.id);
  if (error) return res.status(404).send("Brand not found");
  res.status(204).send();
});

app.patch("/brands/:id", async (req, res) => {
  const { data: updatedBrand, error } = await supabase
    .from("brands")
    .update(req.body)
    .eq("id", req.params.id);
  if (error) return res.status(404).send("Brand not found");
  res.json(updatedBrand);
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

module.exports = app;
