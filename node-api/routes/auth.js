const express = require("express");
const authRoutes = express.Router();

authRoutes.post("/auth/login", (req, res, next) => {
  req.session.isLoggedIn = true;
  res.json({ message: "Success to login" });
});

authRoutes.get("/auth/login", (req, res, next) => {
  console.log("req.session.isLoggedIn:", req.session.isLoggedIn);
  res.json({ message: "Success to login" });
});
module.exports = authRoutes;
