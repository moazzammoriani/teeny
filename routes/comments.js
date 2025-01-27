const commentsRouter = require("express").Router();
const { authenticateSession } = require("../utils/middelware");

commentsRouter.post("/", authenticateSession, (req, res) => {
  const { posted_date, parent_blog } = req.body;
  const author = req.user.id;

  // Escape `'` for SQL
  const contentBeforeEscape = req.body.content;
  const content = contentBeforeEscape.replaceAll("'", "''");

  console.log(`parentBlog = ${parent_blog}`);

  global.db.all(
    `INSERT INTO comments (content, posted_date, author, parent_blog) VALUES (?, ?, ?, ?) returning comments.id`,
    [content, posted_date, author, parent_blog],
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }
      const { id } = rows[0];
      global.db.all(
        "SELECT username FROM users WHERE users.id=?",
        [author],
        (err, rows) => {
          if (err) {
            console.log(err);
            return res.status(400).end();
          }

          const { username } = rows[0];
          res.json({
            id,
            content: contentBeforeEscape,
            posted_date,
            parent_blog,
            username,
          });
        },
      );
    },
  );
});

module.exports = commentsRouter;
