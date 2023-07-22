const commentsRouter = require("express").Router();

commentsRouter.post("/", (req, res) => {
  const { content, posted_date, author, parent_blog } = req.body;

  global.db.all(
    `INSERT INTO comments (content, posted_date, author, parent_blog) VALUES ('${content}', '${posted_date}', '${author}', '${parent_blog}') returning comments.id`,
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }
      const { id } = rows[0];
      res.json({
        id,
        content,
        posted_date,
        parent_blog,
      });
    },
  );
});

module.exports = commentsRouter;
