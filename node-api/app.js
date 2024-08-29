const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const productRoutes = require("./routes/products");
const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cartItem");
const Order = require("./models/order");
const OrderItem = require("./models/orderItem");
const cartRoutes = require("./routes/cart");
const orderRoutes = require("./routes/order");
const app = express();

app.use(bodyParser.json());

// app.use((req, res, next) => {
//   console.log("Some middleware!");
//   next();
// });
app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => {
      console.log("fetch user err:", err);
    });
});

// handle cors
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(productRoutes);
app.use(cartRoutes);
app.use(orderRoutes);

/* 
  onDelete: "CASECADE" 為當 User 刪除，及刪除 product
*/

Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {
  through: OrderItem,
  onDelete: "CASCADE", // This ensures order items are deleted when an order is deleted
});
Product.belongsToMany(Order, { through: OrderItem });

sequelize
  // .sync({ force: true }) // {force: true} 用來強制刪除表單，並重新建立表單
  .sync()
  .then(() => {
    return User.findByPk(1);
  })
  .then((user) => {
    if (!user) {
      return User.create({ name: "Joe", email: "joe@joe.com" });
    }
    return user;
  })
  .then((user) => {
    return user.getCart().then((cart) => {
      if (!cart) {
        user.createCart();
      }
      return cart;
    });
  })
  .then((cart) => {
    console.log("sequelize success! start server 8000");
    app.listen(8000);
  })
  .catch((err) => console.log("sequelize mySql err:", err));
