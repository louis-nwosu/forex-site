const UserDetail = require("../models/detailModel");

const loaddetails = async (req, res) => {
  
  //get the ID from the request
  const _userID = req.params.ID;
  //find user that matches the ID
  try {
    const user_detail = await UserDetail.findOne({ userID: _userID });
    //if no user is found, return an error
    if (!user_detail) res.status(400).json({ error: "could not find user" });

    //send the user details to the frontend
    res.status(200).json(user_detail);

    //if error, send back the error.
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = loaddetails;
