const express = require("express");
const { specs, swaggerUi } = require("../docs/swagger");
const bodyParser = require("body-parser");
const app = express();
const port = 4000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/parts", require("./routes/parts"));
app.use("/brands", require("./routes/brands"));
app.use("/globals", require("./routes/globals"));

app.use("/swagger", swaggerUi.serve, swaggerUi.setup(specs));

app.get("/", function (req, res) {
  res.send({ message: "Welcome to Taco Motor API!" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
