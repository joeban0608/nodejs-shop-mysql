const Sequelize = require("sequelize");
const sequelize = require("../util/database");

const Cart = sequelize.define("cart", {
  id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4, // 使用 UUIDV4 作為默認值
    allowNull: false,
    primaryKey: true,
  },
});

module.exports = Cart;
