const loginRouter = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

loginRouter.get("/", (req, res) => {
  res.render("login", {});
});

loginRouter.post("/", (req, res) => {
  const { username, password } = req.body;

  global.db.all(
    `SELECT * FROM users WHERE users.username='${username}'`,
    async (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }

      const user = rows[0];

      const passwordCorrect =
        user === null
          ? undefined
          : await bcrypt.compare(password, user.password_hash);

      if (!user || !passwordCorrect) {
        return res.status(401).json({
          error: "invalid username or password",
        });
      }

      const userForToken = {
        username: user.username,
        id: user.id,
      };

      try {
        const token = jwt.sign(userForToken, process.env.ACCESS_TOKEN_SECRET, {
          expiresIn: "1h",
        });
        console.log(`issued token = ${token}`)
        res.cookie("token", token, { httpOnly: true, Path: "/"});
        res
          .status(200)
          .send({ token, username: user.username, name: user.name });
      } catch (err) {
        console.log(err);
      }
    },
  );
});

module.exports = loginRouter;
