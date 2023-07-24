const blogsRouter = require("express").Router();

blogsRouter.get("/", (req, res) => {
  global.db.all(
    "SELECT id, title, subtitle, content, author, state FROM blogs;",
    (err, rows) => {
      if (err) {
        console.log(err);
        res.status(400).end();
      }
      res.json(rows);
    },
  );
});

blogsRouter.post("/", (req, res) => {
  const { author, creation_date, last_edit_date } = req.body;

  // Escape `'` for SQL
  const title = req.body.title.replaceAll("'", "''");
  const subtitle = req.body.subtitle.replaceAll("'", "''");
  const content = req.body.content.replaceAll("'", "''");

  const blog = {
    title,
    subtitle,
    content,
    author,
    creation_date,
    last_edit_date,
    state: "draft",
  };

  global.db.all(
    `INSERT INTO blogs ('title', 'subtitle', 'author', 'state', 'content', 'creation_date', 'last_edit_date') VALUES ('${title}', '${subtitle}', ${author}, 'draft', '${content}', '${creation_date}', '${last_edit_date}');`,
    (err) => {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }
      res.status(201).json(blog);
    },
  );
});

blogsRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  // Escape `'` for SQL
  req.body.content = req.body.content.replaceAll("'", "''");
  req.body.title = req.body.content.replaceAll("'", "''");
  req.body.subtitle = req.body.content.replaceAll("'", "''");
  const body = req.body;

  const querySubstr = Object.keys(body)
    .map((k) => k + `='${body[k]}'`)
    .join(", ");

  // Update db with new data
  global.db.all(
    `UPDATE blogs SET ${querySubstr} WHERE blogs.id=${id};`,
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }
      // Fetch updated record to return a response to client
      global.db.all(
        `SELECT id, title, subtitle, state FROM blogs WHERE blogs.id=${id};`,
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

blogsRouter.delete("/:id", (req, res) => {
  const id = req.params.id;

  // Delete all comments related to the blog being deleted
  global.db.all(`DELETE FROM comments WHERE parent_blog=${id}`, (err, rows) => {
    if (err) {
      console.log(err);
      return res.status(400).end();
    }

    // Delete the blog itself
    global.db.all(`DELETE FROM blogs WHERE blogs.id=${id}`, (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }
      res.status(204).end();
    });
  });
});

module.exports = blogsRouter;
