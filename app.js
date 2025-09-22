const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

const authRoutes = require('./routes/authRoutes');

const app = express();

// middleware
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// view engine
app.set("view engine", "ejs");

// database connection
const dbURI =
  "mongodb+srv://koimettb:1738@nodejstuts.rmg3aqa.mongodb.net/node-tuts?retryWrites=true&w=majority&appName=nodejstuts";

mongoose
  .connect(dbURI) // no options needed in Mongoose 6+
  .then(() => app.listen(3000, () => console.log("✅ Server running on 3000")))
  .catch((err) => console.error("❌ MongoDB connection error:", err));
 

// routes
app.get("/", (req, res) => res.render("home"));
app.get("/smoothies", (req, res) => res.render("smoothies"));
app.use(authRoutes);

// cookies
app.get('/set-cookies', (req, res) => {

  // res.setHeader('Set-Cookie', 'newUser=true');
  res.cookie('newUser', false);
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true});
  // res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, secure: true});

  res.send('you got the cookies!');

});

app.get('/read-cookies', (req,res) => {

  const cookies = req.cookies;
  console.log(cookies);

  res.json(cookies);
})