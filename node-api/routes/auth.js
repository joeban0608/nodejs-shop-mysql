const express = require("express");
const User = require("../models/user");
const authRoutes = express.Router();

authRoutes.post("/auth/login", (req, res, next) => {
  // req.session.isLoggedIn = true;
  // req.session.user = user;
  // res.json({ message: "Success to login" });

  User.findByPk("2ac4eb59-089b-486a-ae2a-12158dbb05aa")
    .then((user) => {
      req.session.isLoggedIn = true;
      req.session.user = user;
      res.json({ message: "Success to login" });
    })
    .catch((err) => console.log(err));
});

authRoutes.get("/auth/login", (req, res, next) => {
  res.json({ session: req.session ?? false });
});
authRoutes.post("/auth/logout", (req, res, next) => {
  req.session.destroy((err) => {
    if (err) {
      res.status(500).json({ error: `Error to logout: ${err}` });
      return;
    }
    // res.redirect("/");
    res.json({ message: "Success to logout" });
  });
  // res.json({ message: "Success to login" });
});

module.exports = authRoutes;
