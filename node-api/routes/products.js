const express = require("express");
const productRouter = express.Router();
const Product = require("../models/product");

productRouter.get("/products", (req, res, next) => {
  console.log("get products api");
  res.json({ products: [] });
});
productRouter.post("/products", (req, res, next) => {
  console.log("post products api");
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const price = req.body.price;
  const description = req.body.description;
  /* 
    create vs build
    create auto finish 
    build have to manual finish
  */
  const productInfo = {
    title: title,
    imageUrl: imageUrl,
    price: price,
    description: description,
  };
  Product.create(productInfo)
    .then((result) => {
      console.log(result);
      // respone to frontend
      res
        .status(201)
        .json({ message: "prdouct created!", product: productInfo });
    })
    .catch((err) => {
      console.log("product create err", err);
      res
        .status(400)
        .json({ error: "failed to created!", reason: err?.message ?? "" });
    });
});
module.exports = productRouter;
