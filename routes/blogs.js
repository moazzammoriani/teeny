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
  // TODO: Replace single quotes with escape characters inserting them in a global.db query
  // to prevent errors.
  const { title, subtitle, content, author, creation_date, last_edit_date } =
    req.body;

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
      }
      res.status(201).json(blog);
    },
  );
});

blogsRouter.put("/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const querySubstr = Object.keys(body)
    .map((k) => k + `='${body[k]}'`)
    .join(", ");

  global.db.all(
    `UPDATE blogs SET ${querySubstr} WHERE blogs.id=${id};`,
    (err, rows) => {
      if (err) {
        console.log(err);
      }
      global.db.all(
        `SELECT id, title, subtitle, state FROM blogs WHERE blogs.id=${id};`,
        (err, rows) => {
          if (err) {
            console.log(err);
          }
          res.json(rows[0]);
        },
      );
    },
  );
});

blogsRouter.delete("/:id", (req, res) => {
  const id = req.params.id;

  global.db.all(`DELETE FROM blogs WHERE blogs.id=${id}`, (err, rows) => {
    if (err) {
      console.log(err);
    }
    res.status(204).end();
  });
});

module.exports = blogsRouter;
