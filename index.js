const express = require("express");
const app = express();
const port = 3000;
const sqlite3 = require("sqlite3").verbose();
app.use(express.json());
const blogsRouter = require("./routes/blogs");
const usersRouter = require("./routes/users");

//items in the global namespace are accessible throught out the node application
global.db = new sqlite3.Database("./database.db", function(err) {
  if (err) {
    console.error(err);
    process.exit(1); //Bail out we can't connect to the DB
  } else {
    console.log("Database connected");
    global.db.run("PRAGMA foreign_keys=ON"); //This tells SQLite to pay attention to foreign key constraints
  }
});

app.set("view engine", "ejs");
app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  db.all(
    "SELECT title, subtitle, username, publish_date FROM blogs JOIN users ON author=users.id WHERE blogs.state='published';",
    (err, rows) => {
      if (err) {
        console.log(err);
      }
      const blogs = rows;
      res.render("index", { blogs });
    },
  );
});

app.get("/author/home", (req, res) => {
  db.all(
    "SELECT name, blog_title, blog_subtitle FROM users WHERE users.id=1",
    (err, rows) => {
      if (err) {
        console.log(err);
        return res.status(400).end();
      }
      const { name, blog_title, blog_subtitle } = rows[0];

      db.all(
        "SELECT id, title, subtitle, state, publish_date, creation_date, last_edit_date FROM blogs;",
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

app.get("/author/create", (req, res) => {
  res.render("create", {});
});

app.get("/author/edit/:id", (req, res) => {
  const id = req.params.id;
  db.all(
    `SELECT id, title, subtitle, content, state, creation_date, last_edit_date FROM blogs WHERE blogs.id=${id}`,
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

app.get("/author/settings", (req, res) => {
  db.all(
    "SELECT id, name, blog_title, blog_subtitle FROM users WHERE users.id=1",
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

app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter)
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
