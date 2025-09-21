const User = require('../models/User');

// GET login form
const login_get = (req, res) => {
  res.render("login", { title: "Login", error: null });
};

// GET signup form
const signup_get = (req, res) => {
  res.render("signup", { title: "Sign Up", error: null });
};

// POST login form
const login_post = (req, res) => {
  const { email, password } = req.body;

  console.log(`email: ${email} password: ${password}`);
  res.send("successful login");
};

// POST signup form
const signup_post = async (req, res) => {
  const { email, password } = req.body;

  try{
    const user = await User.create({email,password});
    res.status(201).json(user)
  }
  catch (err) {
    console.log(err);
    res.status(400).send('error, user not created')
  }
};

module.exports = {
  signup_get,
  signup_post,
  login_get,
  login_post,
};
