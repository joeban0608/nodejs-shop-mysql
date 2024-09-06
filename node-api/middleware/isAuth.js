module.exports = (req, res, next) => {
  if (!req.user || !req?.session?.isLoggedIn) {
    return res
      .status(400)
      .json({ error: "User not logged in or session expired" });
  }
  return next();
};
