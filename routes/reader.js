const readerRouter = require("express").Router();
const { authenticateSession } = require("../utils/middelware");

readerRouter.get("/article/:id", authenticateSession, (req, res) => {
  const id = req.params.id;
  const user = req.user;

  global.db.all(
    `SELECT id, name, blog_title, blog_subtitle FROM users WHERE users.id=${user.id}`,
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }
      const { name, blog_title, blog_subtitle } = rows[0];

      global.db.all(
        `SELECT id, likes, title, subtitle, content, state, publish_date, creation_date, last_edit_date FROM blogs WHERE blogs.id=${id};`,
        (err, rows) => {
          if (err) {
            console.log(err);
            return res.status(400).end();
          }
          const { title, subtitle, content, likes } = rows[0];
          console.log(rows);
          global.db.all(
            `SELECT comments.id, comments.content, comments.posted_date, users.username, comments.parent_blog FROM comments JOIN users ON comments.author=users.id WHERE comments.parent_blog=${id}`,
            (err, rows) => {
              if (err) {
                console.log(err);
              }
              const comments = rows;

              res.render("article", {
                id,
                title,
                subtitle,
                content,
                name,
                blog_title,
                blog_subtitle,
                comments,
                likes,
              });
            },
          );
        },
      );
    },
  );
});

readerRouter.get("/home", authenticateSession, (req, res) => {
  const user = req.user;

  global.db.all(
    `SELECT blog_title, blog_subtitle, name FROM users WHERE users.id=${user.id};`,
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }
      const { blog_title, blog_subtitle, name } = rows[0];

      global.db.all(
        "SELECT blogs.id, title, subtitle, username, publish_date FROM blogs JOIN users ON author=users.id WHERE blogs.state='published';",
        (err, rows) => {
          if (err) {
            console.log(err);
            return res.status(400).end();
          }
          const blogs = rows;
          res.render("index", { blogs, blog_title, blog_subtitle, name });
        },
      );
    },
  );
});

module.exports = readerRouter;
