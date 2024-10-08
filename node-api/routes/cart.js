const express = require("express");
const Product = require("../models/product");
const cartRoutes = express.Router();
const isAuthMiddleware = require("../middleware/isAuth");
// get cart data
cartRoutes.get("/cart", isAuthMiddleware, (req, res, next) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      return res.json({ data: products });
    })
    .catch((err) => {
      console.log("get cart err", err);
      return res.json({ data: [] });
    });
});

// add product to cart
cartRoutes.post("/cart/:id", isAuthMiddleware, (req, res, next) => {
  const pid = req.params.id;
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
      res.json({ message: "Success to add cartItem to cart." });
    })
    .catch((err) => {
      console.log("add cartItem to cart err", err);
      res.json({ error: "failed to add cartItem to cart!" });
    });
});

// delete cartItem
cartRoutes.delete("/cart/:id", isAuthMiddleware, (req, res, next) => {
  const pid = req.params.id;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts({ where: { id: pid } });
    })
    .then((products) => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then((result) => {
      res.json({ message: "Success to delete cartItem" });
    })
    .catch((err) => {
      console.log("Deleted cartItem err:", err);
      res.json({ error: "failed to delete cartItem" });
    });
});

module.exports = cartRoutes;
