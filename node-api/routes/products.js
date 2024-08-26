const express = require("express");
const productRouter = express.Router();
const Product = require("../models/product");

productRouter.get("/products", (req, res, next) => {
  Product.findAll()
    .then((prdoucts) => {
      res.json({ products: prdoucts });
    })
    .catch((err) => {
      console.log("err to get all products", err);
    });
});
productRouter.post("/products", (req, res, next) => {
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
