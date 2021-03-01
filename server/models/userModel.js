const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  balance: {
    type: Number,
    default: 0.0,
  },
  invested: {
    type: Number,
    default: 0.0,
  },
  withdrew: {
    type: Number,
    default: 0.0,
  },
});

module.exports = mongoose.model("User", userSchema);
