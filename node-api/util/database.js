const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("nodejs-shop", "root", "00000000", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
