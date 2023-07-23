const express = require("express");
const app = express();
const port = 3000;
const sqlite3 = require("sqlite3").verbose();
app.use(express.json());
const blogsRouter = require("./routes/blogs");
const usersRouter = require("./routes/users");
const commentsRouter = require("./routes/comments");
const readerRouter = require("./routes/reader");
const authorRouter = require("./routes/author");
const loginRouter = require("./routes/login");
const cookies = require("cookie-parser");
const jwt = require("jsonwebtoken");

app.use(cookies());

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
  try {
    const token = req.cookies.token
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    res.redirect("/reader/home");
  } catch (err) {
    console.log(err)
    res.redirect("/login")
  }
});

app.get("/login", (req, res) => {
  res.render("login", {});
});

app.use("/api/login", loginRouter);
app.use("/author", authorRouter);
app.use("/reader", readerRouter);
app.use("/api/comments", commentsRouter);
app.use("/api/blogs", blogsRouter);
app.use("/api/users", usersRouter);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
