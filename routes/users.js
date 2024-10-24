const usersRouter = require("express").Router();
const bcrypt = require("bcrypt");

usersRouter.get("/", (req, res) => {
  global.db.all("SELECT * FROM users", (err, rows) => {
    res.json(rows);
  });
});

usersRouter.put("/:id", (req, res) => {
  const id = req.params.id;

  const body = req.body;

  const querySubstr = Object.keys(body)
    .map((k) => k + `='${body[k]}'`)
    .join(", ");

  global.db.all(
    "UPDATE users SET ${querySubstr} WHERE users.id=?",
    [id],
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }
      global.db.all(
        "SELECT blog_title, blog_subtitle, name FROM users WHERE users.id=?",
        [id],
        (err, rows) => {
          if (err) {
            console.log(err);
            return res.status(400).end();
          }
          res.json(rows[0]);
        },
      );
    },
  );
});

usersRouter.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;

  const password_hash = await bcrypt.hash(password, saltRounds);

  global.db.all(
    `INSERT INTO users ('username', 'name', 'password_hash') VALUES (?, ?, ?);`,
    [username, name, password_hash],
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }
      res.status(201).json({ username, name, password_hash });
    },
  );
});

module.exports = usersRouter;
