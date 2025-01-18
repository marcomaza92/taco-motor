const express = require("express");
const router = express.Router();

router.get("/all", (req, res) => {
  const brands = {
    data: [
      {
        id: "1",
        name: "Volkswagen",
      },
      {
        id: "2",
        name: "Toyota",
      },
    ],
  };
  res.send(brands);
});

module.exports = router;
