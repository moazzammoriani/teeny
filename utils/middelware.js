require("dotenv").config();
const jwt = require("jsonwebtoken");

const authenticateSession = (req, res, next) => {
  const token = req.cookies.token;

  console.log("Authing sesssion");

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.log("Couldn't authenticate token");
    console.log("Redirecting to login page");
    return res.redirect("/login");
  }
};

module.exports = { authenticateSession };
