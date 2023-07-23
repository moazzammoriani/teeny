const readerRouter = require("express").Router();
const jwt = require("jsonwebtoken");

readerRouter.get("/article/:id", (req, res) => {
  const id = req.params.id;

  global.db.all(
    "SELECT id, name, blog_title, blog_subtitle FROM users WHERE users.id=1",
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }
      const { name, blog_title, blog_subtitle } = rows[0];

      global.db.all(
        `SELECT id, title, subtitle, content, state, publish_date, creation_date, last_edit_date FROM blogs WHERE blogs.id=${id};`,
        (err, rows) => {
          if (err) {
            console.log(err);
            return res.status(400).end();
          }
          const { title, subtitle, content } = rows[0];
          global.db.all(
            `SELECT * FROM comments WHERE comments.parent_blog=${id}`,
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
              });
            },
          );
        },
      );
    },
  );
});

readerRouter.get("/home", (req, res) => {
  const token = req.cookies.token;

  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

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
  } catch (err) {
    console.log("Couldn't authenticate token");
  }
});

module.exports = readerRouter;
