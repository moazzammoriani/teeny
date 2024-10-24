const { authenticateSession } = require("../utils/middelware");
const authorRouter = require("express").Router();

authorRouter.get("/home", authenticateSession, (req, res) => {
  const user = req.user;
  global.db.all(
    "SELECT name, blog_title, blog_subtitle FROM users WHERE users.id=?",
    [user.id],
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }
      const { name, blog_title, blog_subtitle } = rows[0];

      global.db.all(
        "SELECT id, title, subtitle, state, publish_date, creation_date, last_edit_date FROM blogs WHERE author=?",
        [user.id],
        (err, rows) => {
          if (err) {
            console.log(err);
            return res.status(400).end();
          }
          const published = rows.filter((blog) => blog.state === "published");
          const drafts = rows.filter((blog) => blog.state === "draft");
          res.render("dashboard", {
            published,
            drafts,
            name,
            blog_title,
            blog_subtitle,
          });
        },
      );
    },
  );
});

authorRouter.get("/create", authenticateSession, (req, res) => {
  res.render("create", {});
});

authorRouter.get("/edit/:id", authenticateSession, (req, res) => {
  const id = req.params.id;
  global.db.all(
    "SELECT id, title, subtitle, content, state, creation_date, last_edit_date FROM blogs WHERE blogs.id=?",
    [id],
    (err, rows) => {
      if (err) {
        console.log(err);
      }

      const {
        id,
        title,
        subtitle,
        content,
        state,
        creation_date,
        last_edit_date,
      } = rows[0];

      res.render("edit", {
        id,
        title,
        subtitle,
        content,
        state,
        creation_date,
        last_edit_date,
      });
    },
  );
});

authorRouter.get("/settings", authenticateSession, (req, res) => {
  const user = req.user;
  global.db.all(
    "SELECT id, name, blog_title, blog_subtitle FROM users WHERE users.id=?",[user.id],
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }
      const { id, name, blog_title, blog_subtitle } = rows[0];
      res.render("settings", { id, name, blog_title, blog_subtitle });
    },
  );
});

module.exports = authorRouter;
