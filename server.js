var mysql = require("mysql");
var express = require("express");
var cors = require("cors");
var bodyParser = require("body-parser");
const port = 8000;

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const con = mysql.createConnection({
  // put your connection info here
  database: "",
  host: "",
  user: "",
  password: "",
});

con.connect();

app.get("/users/", (req, res) => {
  const sql = "SELECT * FROM users";
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.write(JSON.stringify(result));
    res.end();
  });
});

app.post("/add-user/", (req, res) => {
  var user = req.body;
  const sql = `INSERT INTO users (name, email, phone) VALUES ('${user.name}', '${user.email}', '${user.phone}')`;
  con.query(sql, (err) => {
    if (err) throw err;
  });
  res.send("user added successfully");
  res.end();
});

app.delete("/delete-user/:id/", (req, res) => {
  const userId = req.params.id;
  const sql = `DELETE FROM users WHERE id=${userId}`;
  con.query(sql, (err) => {
    if (err) throw err;
  });
  res.send("user deleted successfully");
  res.end();
});

app.patch("/edit-user/", (req, res) => {
  const user = req.body;
  const sql = `UPDATE users SET name = '${user.name}', email = '${user.email}', phone = '${user.phone}' WHERE id = ${user.id};`;
  con.query(sql, (err) => {
    if (err) throw err;
  });
  res.send("user edited successfully");
  res.end();
});

app.listen(port, () => console.log(`server is running on port ${port}`));
