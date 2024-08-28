const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const OartItem = sequelize.define("ortherItem", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  quantity: Sequelize.INTEGER,
});

module.exports = OartItem;
