const express = require("express");

//local imports;
const { getUsers, postNewUser } = require("../controllers/userController");
const signinHandler = require("../controllers/signin");
const getUserDetails = require("../controllers/loadDetails");

//middlewares
const auth = require("../middleware/auth");

const route = express.Router();

route.get("/", getUsers);
route.post("/signup", postNewUser);
route.post("/signin", signinHandler);
route.get("/details/:ID", getUserDetails);

module.exports = route;
