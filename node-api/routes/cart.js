const express = require("express");
const cartRoutes = express.Router();

cartRoutes.get("/cart", (req, res, next) => {
  // console.log(req.user);
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          return res.json({ data: products });
        })
        .catch((err) => {
          console.log("get cart products err", err);
        });
    })
    .catch((err) => {
      console.log("get cart err", err);
    });
  // res.json({ message: "cart here" });
});

module.exports = cartRoutes;
