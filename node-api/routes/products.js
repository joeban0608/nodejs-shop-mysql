const express = require("express");
const productRouter = express.Router();
const Product = require("../models/product");
const isAuthMiddleware = require("../middleware/isAuth");
const User = require("../models/user");

// update product
productRouter.put("/products/:id", (req, res, next) => {
  const pid = req.params.id;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  const updatedImageUrl = req.body.imageUrl;
  const updatedDescription = req.body.description;
  Product.findByPk(pid)
    .then((product) => {
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.imageUrl = updatedImageUrl;
      product.description = updatedDescription;
      // return product.save(); 使用下一個 .then 做 .save 的 response
      return product.save();
    })
    .then((result) => {
      res.status(201).json({ message: "UPDATED SUCCESS!" });
    })
    .catch((err) => {
      console.log("err to update prodcut!", err);
      res.status(400).json({
        error: "failed to update product!",
        reason: err?.message ?? "",
      });
    });
});

/* 
  get product info
  req.user.getProducts() => products[0]
  模擬只獲取用戶的 product 資訊
*/
productRouter.post("/products/:id", isAuthMiddleware, (req, res, next) => {
  const pid = req.params.id;
  // Product.findByPk(pid)

  req.user
    .getProducts({ where: { id: pid } })
    .then((products) => {
      if (!products?.length) {
        throw new Error("failed to get product");
      }
      res.json({ data: products[0] });
    })
    .catch((err) => {
      console.log("err to get product info!", err);
      res.status(400).json({
        error: "failed to get product!",
        reason: err?.message ?? "",
      });
    });
});

/* 
  get all products
*/
productRouter.get("/products", (req, res, next) => {
  Product.findAll({
    include: [
      {
        model: User,
        attributes: ["email"], // 只選擇要顯示的 email 屬性
      },
    ],
  })
    .then((prdoucts) => {
      res.json({ data: prdoucts });
    })
    .catch((err) => {
      console.log("err to get all products", err);
      res
        .status(400)
        .json({ error: "failed to get products!", reason: err?.message ?? "" });
    });
});
productRouter.get("/product/:id", (req, res, next) => {
  const pid = req.params.id;

  Product.findAll({ where: { id: pid } })
    .then((product) => {
      console.log("product", product);
      res.json({ data: product[0] });
    })
    .catch((err) => {
      console.log("err to get all products", err);
      res
        .status(400)
        .json({ error: "failed to get products!", reason: err?.message ?? "" });
    });
});
/* 
  get admin products
*/
productRouter.get("/admin/products", (req, res, next) => {
  req.user
    .getProducts()
    .then((prdoucts) => {
      console.log("prdoucts", prdoucts);
      res.json({ data: prdoucts });
    })
    .catch((err) => {
      console.log("err to get all products", err);
      res
        .status(400)
        .json({ error: "failed to get products!", reason: err?.message ?? "" });
    });
});

module.exports = productRouter;
