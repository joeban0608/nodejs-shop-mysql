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
const session = require("express-session");
const authRoutes = require("./routes/auth");
const SequelizeStore = require("connect-session-sequelize")(session.Store);

app.use(bodyParser.json());
app.use(
  session({
    secret: "my secret",
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize,
    }),
    // cookie: { secure: true },
  })
);

// handle cors
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  res.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.set("Access-Control-Allow-Headers", "Content-Type");
  res.set("Access-Control-Allow-Credentials", "true"); // 允許憑證
  next();
});


app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findByPk(req.session.user.id)
    .then((user) => {
      req.user = user;

      next();
    })
    .catch((err) => console.log(err));
});

app.use(productRoutes);
app.use(cartRoutes);
app.use(orderRoutes);
app.use(authRoutes);

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

  .then((result) => {
    console.log("sequelize success! start server 8000");
    app.listen(8000);
  })
  .catch((err) => console.log("sequelize mySql err:", err));
