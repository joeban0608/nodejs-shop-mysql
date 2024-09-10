const express = require("express");
const adminRouter = express.Router();
const Product = require("../models/product");
const isAuthMiddleware = require("../middleware/isAuth");
const { check, validationResult, body } = require("express-validator");

// delete product
adminRouter.delete(
  "/admin/delete-product/:id",
  isAuthMiddleware,
  (req, res, next) => {
    const pid = req.params.id;
    Product.findByPk(pid)
      .then((product) => {
        return product.destroy();
      })
      .then((result) => {
        console.log("DESTROYED PROUDCT!");
        res.status(201).json({ message: "Success to Delete Product" });
      })
      .catch((err) => {
        console.log("err to delete product!", err);
        res.status(400).json({
          error: "failed to delete product!",
          reason: err?.message ?? "",
        });
      });
  }
);

// add product
adminRouter.post(
  "/admin/add-product",
  [
    body("title", "title at least 3 characters")
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body("imageUrl", "image must be url").isURL(),
    body("price", "price must be number.").isFloat(),
    body(
      "description",
      "description at least 5 characters, less than 400 characters."
    )
      .isLength({ min: 5, max: 400 })
      .trim(),
  ],
  isAuthMiddleware,
  (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(422).json({ error: errors.array()[0].msg });
      return next();
    }

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

    /* 
    req.user 從 app.js 新增過來的，
    透過 sequlize 的機制，當使用 User.hasMany(Product); ... method 會自動建立 createProduct
    ref: https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances
  */
    // Product.create(productInfo)

    req.user
      .createProduct(productInfo)
      .then((result) => {
        res
          .status(201)
          .json({ message: "Prdouct Created!", product: productInfo });
      })
      .catch((err) => {
        console.log("product create err", err);
        res
          .status(400)
          .json({ error: "failed to created!", reason: err?.message ?? "" });
      });
  }
);

// update product
adminRouter.put(
  "/admin/edit-product/:id",
  isAuthMiddleware,
  (req, res, next) => {
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
  }
);

/* 
  get product info
  req.user.getProducts() => products[0]
  模擬只獲取用戶的 product 資訊
*/
adminRouter.get("/admin/product/:id", isAuthMiddleware, (req, res, next) => {
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
  get admin products
*/
adminRouter.get("/admin/products", (req, res, next) => {
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

module.exports = adminRouter;
