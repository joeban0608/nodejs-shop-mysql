const express = require("express");
const productRouter = express.Router();
const Product = require("../models/product");
const User = require("../models/user");

/* 
  get all products
*/
const PAGE_SIZE = 4; // 每頁顯示的項目數

productRouter.get("/products", (req, res, next) => {
  const page = +req.query.page || 1; // 當前頁碼，默認為第1頁
  let totalItems;
  Product.count()
    .then((count) => {
      totalItems = count;
      return Product.findAll({
        include: [
          {
            model: User,
            attributes: ["email"], // 只選擇要顯示的 email 屬性
          },
        ],
        limit: PAGE_SIZE,
        offset: (page - 1) * PAGE_SIZE,
      });
    })
    .then((prdoucts) => {
      res.json({
        data: prdoucts,
        pagination: {
          // is_next_page: ITEMS_PER_PAGE * page < totalItems,
          // is_previous_page: page > 1,
          // next_page: page + 1,
          // previous_page: page - 1,
          // last_page: Math.ceil(totalItems / ITEMS_PER_PAGE),
          current_page: page,
          page_size: PAGE_SIZE,
          total: totalItems,
        },
      });
    })
    .catch((err) => {
      console.log("err to get all products", err);
      res
        .status(400)
        .json({ error: "failed to get products!", reason: err?.message ?? "" });
    });
});

/* get product info */
productRouter.get("/product/:id", (req, res, next) => {
  const pid = req.params.id;

  Product.findAll({ where: { id: pid } })
    .then((product) => {
      // throw new Error("get product Dummy Error");
      // console.log("product", product);
      res.json({ data: product[0] });
    })
    .catch((err) => {
      console.log("err to get all products", err);
      next(new Error(err));
      // res
      //   .status(500)
      //   .json({ error: "failed to get products!", reason: err?.message ?? "" });
    });
});

module.exports = productRouter;
