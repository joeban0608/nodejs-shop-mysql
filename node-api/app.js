const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./util/database");
const Product = require("./models/product");

// const todoRoutes = require("./routes/todos");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  console.log("Some middleware!");
  next();
});

// app.use(todoRoutes);

app.listen(8000);
sequelize
  // .sync({ force: true })
  .sync({ force: true })
  .then((res) => {
    // console.log("res", res);
  })
  .catch((err) => console.log("sequelize mySql err:", err));
