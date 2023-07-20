const express = require("express");
const app = express();
const port = 3000;
const sqlite3 = require("sqlite3").verbose();

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

app.get("/", (req, res) => {
  db.all(
    "SELECT title, subtitle, username FROM blogs JOIN users ON author=user_id",
    (err, rows) => {
      const blogs = rows;
      res.render("index", { thing: "llama", blogs });
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
