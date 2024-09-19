const express = require("express");
const orderRoutes = express.Router();
const isAuthMiddleware = require("../middleware/isAuth");
const path = require("path");
const fs = require("fs");
const Order = require("../models/order");
const PDFDocument = require("pdfkit");
const Product = require("../models/product");

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
  Order.findByPk(oid, {
    include: [{ model: Product }], // 包括关联的 products
  })
    .then((order) => {
      if (!order) {
        return next(new Error("No order found."));
      }
      if (order.userId !== req.user.id) {
        return next(new Error("Unauthorized"));
      }
      const pdfDoc = new PDFDocument();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        'inline; filename="' + invoiceName + '"'
      );
      pdfDoc.pipe(fs.createWriteStream(invoicePath));
      // 文件開始
      pdfDoc.pipe(res);

      // 文件內文：

      pdfDoc.fontSize(26).text("Invoice", {
        lineGap: 6,
      });
      pdfDoc.fontSize(16).text(`Order ID: ${oid}`, {
        lineGap: 6,
      });

      // 分隔線
      hr(pdfDoc);

      // 似 <br> 換行
      br(pdfDoc);

      let totalPrice = 0;
      order.products.forEach((prod, i) => {
        const isLast = i === order.products.length - 1;
        const price = prod.price;
        const quantitiy = prod.orderItem.quantity;
        totalPrice += price * quantitiy;
        const subtotalPrice = price * quantitiy;
        pdfDoc.fontSize(22).text(prod.title, {
          lineGap: 3,
        });
        pdfDoc.fontSize(12).text(`Price: $${price}`, {});
        pdfDoc.fontSize(12).text(`Quantity: ${quantitiy}`, { lineGap: 2 });
        pdfDoc.fontSize(14).text(`Subtotal: $${subtotalPrice}`, {});

        if (!isLast) {
          pdfDoc.text(" ", {
            lineGap: 10,
          });
        }
      });

      br(pdfDoc);
      hr(pdfDoc);
      br(pdfDoc);
      pdfDoc.fontSize(20).text("Order Total: $" + totalPrice);

      // 文健結束
      pdfDoc.end();
    })
    .catch((err) => {
      console.log("get /orders/:oid error", err);
      next(err);
    });
});

// 分隔線
const hr = (pdfDoc) => {
  pdfDoc
    .moveTo(50, pdfDoc.y) // 起始点 (x1, y1) - 当前 y 位置
    .lineTo(550, pdfDoc.y) // 结束点 (x2, y2) - 同一行的右边
    .stroke();
};

// 似 <br> 換行
const br = (pdfDoc) => {
  pdfDoc.text(" ", {
    lineGap: 1,
  });
};

module.exports = orderRoutes;
