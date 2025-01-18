const express = require("express");
const { Brand } = require("../models");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

/**
 * @swagger
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

router.get("/all", async (req, res) => {
  const brands = await Brand.findAll();
  res.json(brands);
});

router.post("/create", async (req, res) => {
  const newBrand = await Brand.create(req.body);
  console.log(newBrand, req.body);
  const brands = await Brand.findAll();
  res.json(brands);
});

router.get("/:id", async (req, res) => {
  const brand = await Brand.findByPk(req.params.id);
  if (brand) {
    res.json(brand);
  } else {
    res.status(404).send("Brand not found");
  }
});

router.delete("/:id", async (req, res) => {
  const result = await Brand.destroy({ where: { id: req.params.id } });
  if (result) {
    res.status(204).send();
  } else {
    res.status(404).send("Brand not found");
  }
});

router.patch("/:id", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

module.exports = router;
