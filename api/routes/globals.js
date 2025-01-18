const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const { sequelize } = require("../models");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

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
router.post("/reset-tables", async (req, res) => {
  try {
    await sequelize.drop();
    await sequelize.sync();
    res.status(200).send({ message: "Tables reset successfully" });
  } catch (error) {
    res.status(500).send({ message: "Error resetting tables" });
  }
});

module.exports = router;
