const express = require("express");
const { specs, swaggerUi } = require("../docs/swagger");
const app = express();
const port = 4000;
const { Part, Brand, sequelize } = require("./models");

app.use("/parts", require("./routes/parts"));
app.use("/brands", require("./routes/brands"));

app.use("/", swaggerUi.serve, swaggerUi.setup(specs));

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
    res.status(200).send("Tables reset successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error resetting tables");
  }
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
