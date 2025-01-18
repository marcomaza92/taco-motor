const express = require("express");
const router = express.Router();

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
 */
router.get("/all", (req, res) => {
  const parts = {
    data: [
      {
        id: "1",
        name: "Taco Motor",
      },
      {
        id: "2",
        name: "Bujía",
      },
    ],
  };
  res.send(parts);
});

module.exports = router;
