const { Sequelize } = require("sequelize");
const sequelize = new Sequelize(
  process.env.DB_NAME || "nodejs-shop", // nodejs-shop
  process.env.DB_USER || "root", // root
  process.env.DB_PASSWORD || "00000000", // 00000000
  {
    host: process.env.DB_HOST || "localhost", // localhost
    dialect: "mysql",
    port: process.env.DB_PORT || 3306, // 确保这里指向 3306
  }
);

module.exports = sequelize;
