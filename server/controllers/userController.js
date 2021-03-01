const bcrypt = require("bcrypt-node");

//local imports
const UserModel = require("../models/userModel");
const { registerValidation, loginValidation } = require("../validate");

const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(400).json({ err });
  }
};

const postNewUser = async (req, res) => {
  //validate data from request
  // const { error } = registerValidation(req.body);
  // if (error) {
  //   res.status(400).send(error.details[0].message);
  //   return;
  // }

  //check if user already exists
  const isUserTaken = await UserModel.findOne({ email: req.body.email });
  if (isUserTaken) {
    res.status(400).json({ message: "the email you provided already exists" });
  }

  //if user doesn't exist, hash the password
  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  //create the user, finally!!
  const user = new UserModel({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });

  //store the user in the database
  try {
    const savedUser = user.save();
    res.status(200).json({ user: savedUser });

    //if error occured while saving;
  } catch (err) {
    res.status(400).json({ err: 'error saving user' });
  }
};

module.exports = {
  getUsers,
  postNewUser,
};
