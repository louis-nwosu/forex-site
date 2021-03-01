const express = require("express");
const bcrypt = require('bcrypt-node')

//local imports;
const userControllers = require('../controllers/userController')
const { getUsers, postNewUser } = userControllers;

const route = express.Router();

route.get("/", getUsers);
route.post('/', postNewUser);

module.exports = route;
