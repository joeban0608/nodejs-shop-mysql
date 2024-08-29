const express = require("express");
const orderRoutes = express.Router();

// create order
orderRoutes.post("/order", (req, res, next) => {
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
orderRoutes.get("/orders", (req, res, next) => {
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

module.exports = orderRoutes;
