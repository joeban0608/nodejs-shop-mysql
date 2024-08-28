const express = require("express");
const Product = require("../models/product");
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
cartRoutes.post("/cart/:id", (req, res, next) => {
  const pid = req.params.id;
  // console.log("pid", pid);
  // console.log(req.user);
  let newQuantity = 1;
  let fetchedCart;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCart = cart;
      return cart.getProducts({ where: { id: pid } });
    })
    .then((cardProducts) => {
      let product;
      if (cardProducts.length > 0) {
        product = cardProducts[0];
      }

      if (product) {
        const oldQuantity = product.cartItem.quantity;
        newQuantity = oldQuantity + 1;
        return product;
      }
      return Product.findByPk(pid);
    })
    .then((product) => {
      return fetchedCart.addProduct(product, {
        through: { quantity: newQuantity },
      });
    })
    .then(() => {
      res.json({ message: "Success to add product to cart." });
    })
    .catch((err) => {
      res.json({ error: "failed to add product to cart!" });
      console.log("create cart product err", err);
    });
});

module.exports = cartRoutes;
