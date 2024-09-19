const express = require("express");
const orderRoutes = express.Router();
const isAuthMiddleware = require("../middleware/isAuth");
const path = require("path");
const fs = require("fs");
const Order = require("../models/order");

// create order
orderRoutes.post("/order", isAuthMiddleware, (req, res, next) => {
  let fetchedCartProducts;
  let fetchedCard;
  req.user
    .getCart()
    .then((cart) => {
      fetchedCard = cart;
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
      // 成功後，清空購物車
      return fetchedCard
        .setProducts(null)
        .then(() => {
          // 只有在成功清空购物车后才发送成功响应
          res.json({ message: "Success to Create Order" });
        })
        .catch((err) => {
          // 如果清空购物车失败，回應錯誤信息給客戶端
          console.error("Failed to clear cart after order creation:", err);
          res.status(500).json({
            error: `Failed to clear cart after order creation: ${err.message}`,
          });
        });
    })
    .catch((err) => {
      // 处理创建订单期间的错误
      console.error("Error during order creation:", err);
      res.status(500).json({ error: "Server error during order creation." });
    });
});

// get orders
orderRoutes.get("/orders", isAuthMiddleware, (req, res, next) => {
  req.user
    .getOrders({ include: ["products"] })
    .then((orders) => {
      res.json({ data: orders });
    })
    .catch((err) => {
      console.log("get orders err", err);
      res.status(400).json({ error: `Get orders err: ${err.message}` });
    });
});

// get order by id
orderRoutes.get("/orders/:oid", isAuthMiddleware, (req, res, next) => {
  const oid = req.params.oid;
  const invoiceName = "invoice-" + oid + ".pdf";
  const invoicePath = path.join("invoices", invoiceName);
  Order.findByPk(oid)
    .then((order) => {
      if (!order) {
        return next(new Error("No order found."));
      }
      if (order.userId !== req.user.id) {
        return next(new Error("Unauthorized"));
      }
      // fs.readFile(invoicePath, (err, data) => {
      //   if (err) {
      //     console.log("read order err", err);
      //     return next(err);
      //   }
      //   res.setHeader("Content-Type", "application/pdf");
      //   res.setHeader(
      //     "Content-Disposition",
      //     'inline; filename="' + invoiceName + '"'
      //   );
      //   res.send(data);
      // });
      const file = fs.createReadStream(invoicePath);
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'inline; filename="' + invoiceName + '"'
      );
      file.pipe(res);
    })
    .catch((err) => {
      console.log("get /orders/:oid error", err);
      next(err);
    });
});

module.exports = orderRoutes;
