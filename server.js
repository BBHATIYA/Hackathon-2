const express = require("express");
const knex = require("knex");
const bcrypt = require("bcrypt");
const app = express();

//connecting with database
const db = knex({
  client: "pg",
  connection: {
    host: "127.0.0.1",
    port: 5433,
    user: "postgres",
    password: "Bhavesh03",
    database: "news",
  },
});

//route for all static files
app.use("/", express.static(__dirname + "/public"));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//listen to the server port 3000
app.listen(3000, () => {
  console.log("server is running on port 3000");
});

app.get("/news", (req, res) => {
  console.log(req.query);
  res.json({ msg: "OK GOOD", status: 200 });
});

//using post method
app.post("/register", async (req, res) => {
  console.log(req.body);
  const salt = await bcrypt.genSalt();
  const hashPassword = await bcrypt.hash(req.body.password, salt);
  saveUser(req.body.fname, req.body.lname, req.body.email, hashPassword)
    .then((data) => {
      res.json(data);
    })
    .catch((e) => {
      console.log(e);
      res.json({ msg: "Email already exist", status: 4 });
    });
});

//allow user to login only if password and email is correct
app.post("/login", async (req, res) => {
  console.log(req.body);
  getUser(req.body.email)
    .then(async (data) => {
      console.log(data);
      if (data.length == 0) {
        res.json({ msg: "Email does not exist", status: 0 });
      } else {
        console.log(data[0].password);
        const match = await bcrypt.compare(req.body.password, data[0].password);
        if (!match) {
          res.json({ msg: "Wrong Password", status: 1 });
        } else {
          res.json({ msg: "LOGIN OK", status: 2 });
        }
      }
    })
    .catch((e) => {
      console.log(e);
    });
});

//insert data to pg admin
function saveUser(fname, lname, email, password) {
  return db("newsusers")
    .insert({ fname, lname, email, password })
    .returning("id");
}

//getting users
function getUser(email) {
  return db("newsusers")
    .select("id", "fname", "lname", "email", "password")
    .where({ email: email });
}
