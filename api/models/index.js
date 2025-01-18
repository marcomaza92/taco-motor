const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../../db/main.sqlite",
});

class Brand extends Model {}
class Part extends Model {}

Brand.init(
  {
    id: { type: DataTypes.NUMBER, primaryKey: true },
    name: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize, modelName: "brand" }
);
Part.init(
  {
    id: { type: DataTypes.NUMBER, primaryKey: true },
    brandId: DataTypes.NUMBER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  { sequelize, modelName: "part" }
);

sequelize.sync();

module.exports = { Brand, Part, sequelize };
