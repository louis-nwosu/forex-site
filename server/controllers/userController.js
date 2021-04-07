const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//local imports
const BtcUser = require("../models/userModel");
const UserDetails = require("../models/detailModel");
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
  try {
    //check if user already exists
    const isUserTaken = await BtcUser.findOne({ email: req.body.email });
    if (isUserTaken) {
      res
        .status(400)
        .json({ message: "the email you provided already exists" });
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

    const savedUser = await user.save();

    const details = new UserDetails({
      userID: user._id,
    });

    const userDetails = await details.save();

    const token = jwt.sign(
      { email: user.email, id: user._id },
      process.env.SECRET_TOKEN,
      { expiresIn: "1h" }
    );

    return res.status(200).json({ token, savedUser });
    //if error occured while saving;
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUsers,
  postNewUser,
};
