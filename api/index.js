const express = require("express");
const { specs, swaggerUi } = require("../docs/swagger");
const app = express();
const port = 4000;

app.use("/parts", require("./parts"));
app.use("/brands", require("./brands"));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", (req, res) => {
  res.send({
    message: "Welcome to Taco Motor API",
    documentation: "Visit /swagger for API documentation",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
