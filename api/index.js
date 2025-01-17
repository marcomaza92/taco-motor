const express = require("express");
const app = express();
const port = 4000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/brands/all", (req, res) => {
  res.send("Todas las Marcas");
});

app.get("/parts/all", (req, res) => {
  const parts = {
    1: {
      id: "1",
      name: "Taco Motor",
    },
    2: {
      id: "2",
      name: "Bujía",
    },
  };
  res.send(parts);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
