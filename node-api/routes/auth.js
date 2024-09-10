const express = require("express");
const User = require("../models/user");
const authRoutes = express.Router();
const bcrypt = require("bcrypt");
const SALT_ROUNDS = 12;
const { check, validationResult, body } = require("express-validator");

authRoutes.post("/auth/login", (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  if (!email) {
    res.status(400).json({ error: "Email is required" });
    return next();
  }
  if (!password) {
    res.status(401).json({ error: "Password is required." });
    return next();
  }
  User.findOne({ where: { email: email } })
    .then((user) => {
      if (!password || !user) {
        res.status(401).json({ error: "Email or Password is Failed" });
        return next();
      }
      bcrypt.compare(password, user.password).then((isMatch) => {
        console.log("isMatch", isMatch);
        if (!isMatch) {
          res.status(401).json({ error: `email or password is Failed` });
          return next();
        }
        // 密碼成功匹配
        req.session.isLoggedIn = true;
        req.session.user = user;
        return req.session.save((err) => {
          if (err) {
            res
              .status(401)
              .json({ error: `Error to save session about login: ${err}` });
            return next();
          }
          res.json({ message: "Success to login" });
          return next();
        });
      });
    })
    .catch((err) => {
      console.log("Login Server Error err", err);
      res.status(500).json({ error: `Login Server Error: ${err}` });
    });
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

authRoutes.post(
  "/auth/sign-up",
  [
    check("email")
      .isEmail()
      .withMessage("Please enter a vaild email")
      .custom((value, { req }) => {
        return User.findOne({ where: { email: value } }).then((user) => {
          if (user) {
            return Promise.reject("Duplicated email.");
          }
        });
        // if (value === "admin@test.com")
        //   throw new Error("This email address is forbidden");
        // return true;
      }),
    body(
      "password",
      "Please enter a password with only numbers and text and at least 5 characters."
    )
      .isLength({ min: 5 })
      .isAlphanumeric(),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("passwords did not match");
      }
      return true;
    }),
  ],
  (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    const confirmPassword = req.body.confirmPassword;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(422).json({ error: errors.array()[0].msg });
      return next();
    }

    if (!email) {
      res.status(400).json({ error: "Email is required" });
      return next();
    }
    if (password !== confirmPassword) {
      res.status(401).json({ error: "Password is incorrect." });
      return next();
    }

    bcrypt.hash(password, SALT_ROUNDS).then((hashedPassword) => {
      User.create({
        email: email,
        password: hashedPassword,
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
    });
  }
);

module.exports = authRoutes;
