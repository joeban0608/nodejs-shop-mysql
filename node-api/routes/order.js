const express = require("express");
const orderRoutes = express.Router();

orderRoutes.post("/order", (req, res, next) => {
  let fetchedCartProducts;
  req.user
    .getCart()
    .then((cart) => {
      return cart.getProducts();
    })
    .then((products) => {
      fetchedCartProducts = products;
      return req.user.createOrder();
    })
    .then((order) => {
      if (!fetchedCartProducts?.length) {
        throw new Error("Create order failed ! Cart is Empty.");
        // res.status(400).json({ error: "Create order failed ! Cart is Empty." });
        // return;
      }
      return order.addProducts(
        fetchedCartProducts.map((product) => {
          product.orderItem = { quantity: product.cartItem.quantity };
          return product;
        })
      );
    })
    .then((result) => {
      console.log("create orther result", result);
      res.json({ message: "Success to Create Order" });
    })
    .catch((err) => {
      console.log("create order error:", err);
      if (err.message) {
        res.status(400).json({ error: err.message });
      }
      res.status(500).json({ error: "server error" });
    });
});

module.exports = orderRoutes;
