const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { registerValidation, loginValidation } = require("../validate");

//import env config file and configure it;
const dotenv = require("dotenv");
dotenv.config();

const signinHandler = async (req, res) => {
  //validate the entry
  const { error } = loginValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //check if user exists in database
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ err: "email or passsword is incorrect" });
  }

  //validate password
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({ err: "email or password is incorrect" });
  }

  //if everything is alright, create and assign a token
  const token = jwt.sign({ _id: user._id }, process.env.SECRET_TOKEN);

  //if everything is okay, send back the data
  try {
    return res.status(200).json({ token, user });
  } catch (error) {
    res.status(400).json({ err: "bad request bro" });
  }
};

module.exports = signinHandler;
