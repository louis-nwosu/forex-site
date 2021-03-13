const mongoose = require("mongoose");

const detailShema = mongoose.Schema({
  deposit: {
    type: Number,
    default: 0,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  withdraws: {
    type: Number,
    default: 0,
  },
  userID: {
    type: String,
  },
});

module.exports = mongoose.model("details", detailShema);
