const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//local imports
const BtcUser = require("../models/userModel");
const { registerValidation, loginValidation } = require("../validate");

const getUsers = async (req, res) => {
  try {
    const users = await BtcUser.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ err });
  }
};

const postNewUser = async (req, res) => {
  //validate data from request
  const { error } = registerValidation(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  //check if user already exists
  const isUserTaken = await BtcUser.findOne({ email: req.body.email });
  if (isUserTaken) {
    res.status(400).json({ message: "the email you provided already exists" });
  }

  //if user doesn't exist, hash the password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  //create the user, finally!!
  const user = new BtcUser({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });

  //store the user in the database
  try {
    const savedUser = await user.save();

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ savedUser, token });
    //if error occured while saving;
  } catch (err) {
    res.status(400).json({ err: "error saving user" });
  }
};

module.exports = {
  getUsers,
  postNewUser,
};
