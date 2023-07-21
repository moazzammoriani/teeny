
-- This makes sure that foreign_key constraints are observed and that errors will be thrown for violations
PRAGMA foreign_keys=ON;

BEGIN TRANSACTION;

--create your tables with SQL commands here (watch out for slight syntactical differences with SQLite)

CREATE TABLE IF NOT EXISTS testUsers (
    test_user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_name TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS testUserRecords (
    test_record_id INTEGER PRIMARY KEY AUTOINCREMENT,
    test_record_value TEXT NOT NULL,
    test_user_id  INT, --the user that the record belongs to
    FOREIGN KEY (test_user_id) REFERENCES testUsers(test_user_id)
);

--insert default data (if necessary here)

INSERT INTO testUsers ('test_name') VALUES ('Simon Star');
INSERT INTO testUserRecords ('test_record_value', 'test_user_id') VALUES ('Lorem ipsum dolor sit amet', 1); --try changing the test_user_id to a different number and you will get an error


CREATE TABLE IF NOT EXISTS users (
    user_id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL,
    name TEXT NOT NULL
);


CREATE TABLE IF NOT EXISTS blogs (
    blog_id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    subtitle TEXT NOT NULL,
    content TEXT NOT NULL,
    author INT,
    state TEXT,
    FOREIGN KEY (author) REFERENCES users(user_id)
);


INSERT INTO users ('username', 'name') VALUES ('mwzm', 'Moazzam Moriani');
INSERT INTO users ('username', 'name') VALUES ('yeeking', 'Mathew Yee-king');

INSERT OR IGNORE INTO blogs ('title', 'subtitle', 'author', 'state', 'content') VALUES ('I like coding in functional languages', 'a true story', 1, 'published', 'Ever since I read SICP, I have seen great utility in programming functionally. Even programming in OCaml and Haskell has shown me that.');
INSERT OR IGNORE INTO blogs ('title', 'subtitle', 'author', 'state', 'content') VALUES ('I like coding in C', 'oof', 1, 'published', 'The good thing about C is that it gives you exactly what you asked for. If you can read a bit assembly then you can eventually use C to get assembly good that you expect. This has value for low-level systems.');
INSERT OR IGNORE INTO blogs ('title', 'subtitle', 'author', 'state', 'content') VALUES ('I like coding pasta', 'fax', 1, 'draft', 'What can I say. Sometimes I get hungry and I have to just grab a bowl of pasta.');

COMMIT;

