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
      req.session.save((err) => {
        if (err) {
          res.status(500).json({ error: `Error to login: ${err}` });
          return;
        }
        res.json({ message: "Success to login" });
      });
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

authRoutes.post("/auth/sign-up", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  const confirmPassword = req.body.confirmPassword;
  if (!email) {
    res.status(400).json({ error: "Email is required" });
    return next();
  }
  if (password !== confirmPassword) {
    res.status(401).json({ error: "Password is incorrect." });
    return next();
  }
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (user) {
        res.status(401).json({ error: "Duplicated email." });
        return next();
      }
      User.create({
        email: email,
        password: password,
      })
        .then((user) => {
          return user.createCart();
        })
        .then((cart) => {
          console.log("Success to Created User and cart, cartInfo:", cart);
          res.json({ message: `Success to Created User: ${email}` });
        })
        .catch((err) => {
          console.log("Create User Failed err:", err);
          res.status(400).json({ error: "Create User Failed" });
          return next();
        });
    })
    .catch((err) => {
      console.log("Create User when find user Error:", err);
      res.status(500).json({ error: "Create User when find user Error" });
    });
});

module.exports = authRoutes;
