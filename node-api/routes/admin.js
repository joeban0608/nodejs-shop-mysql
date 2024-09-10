const express = require("express");
const adminRouter = express.Router();
const Product = require("../models/product");
const isAuthMiddleware = require("../middleware/isAuth");
const User = require("../models/user");

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

module.exports = adminRouter;
