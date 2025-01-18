const express = require("express");
const { Part } = require("../models");
const bodyParser = require("body-parser");
const router = express.Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

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

router.get("/all", async (req, res) => {
  const parts = await Part.findAll();
  res.json(parts);
});

router.post("/create", async (req, res) => {
  const newPart = await Part.create(req.body);
  const parts = await Part.findAll();
  res.json(parts);
});

router.get("/:id", async (req, res) => {
  const part = await Part.findByPk(req.params.id);
  if (part) {
    res.json(part);
  } else {
    res.status(404).send("Part not found");
  }
});

router.delete("/:id", async (req, res) => {
  const result = await Part.destroy({ where: { id: req.params.id } });
  if (result) {
    res.status(204).send();
  } else {
    res.status(404).send("Part not found");
  }
});

router.patch("/:id", async (req, res) => {
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

router.put("/:id", async (req, res) => {
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

module.exports = router;
