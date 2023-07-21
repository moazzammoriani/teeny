const express = require("express");
const app = express();
const port = 3000;
const sqlite3 = require("sqlite3").verbose();
app.use(express.json());

//items in the global namespace are accessible throught out the node application
global.db = new sqlite3.Database("./database.db", function (err) {
  if (err) {
    console.error(err);
    process.exit(1); //Bail out we can't connect to the DB
  } else {
    console.log("Database connected");
    global.db.run("PRAGMA foreign_keys=ON"); //This tells SQLite to pay attention to foreign key constraints
  }
});
//
//
// const userRoutes = require('./routes/user');
//
// //set the app to use ejs for rendering
app.set("view engine", "ejs");

app.use("/public", express.static("public"));

app.get("/", (req, res) => {
  db.all(
    "SELECT title, subtitle, username FROM blogs JOIN users ON author=user_id WHERE blogs.state='published';",
    (err, rows) => {
      try {
        const blogs = rows;
        res.render("index", { thing: "llama", blogs });
      } catch (err) {
        console.error(err);
      }
    },
  );
});

app.get("/author/home", (req, res) => {
  db.all("SELECT title, subtitle, state FROM blogs;", (err, rows) => {

    try {
      const published = rows.filter((blog) => blog.state === "published");
      const drafts = rows.filter((blog) => blog.state === "draft");
      res.render("dashboard", { published, drafts });
    } catch (err) {
      console.error(err);
      res.status(400).end();
    }
  });
});

app.get("/author/create", (req, res) => {
  res.render("create", {});
});

app.post("/api/blogs", (req, res) => {
  const { title, subtitle, content, author,} = req.body;

  const blog = {
    title,
    subtitle,
    content,
    author,
    state: "draft",
  };

  db.all(
    `INSERT INTO blogs ('title', 'subtitle', 'author', 'state', 'content') VALUES ('${title}', '${subtitle}', ${author}, 'draft', '${content}');`,
    (err) => {
      if (err) {
        console.log(err);
      }
      res.status(201).json(blog);
    },
  );
});

app.get("/api/users", (req, res) => {
  db.all("SELECT * FROM users", (err, rows) => {
    res.json(rows);
  });
});

//this adds all the userRoutes to the app under the path /user
// app.use('/user', userRoutes);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
