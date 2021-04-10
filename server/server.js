const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

//import env config file and configure it;
const dotenv = require("dotenv");
dotenv.config();

//local imports;
const postRoutes = require("./routes/post");

//initialize express application
const app = express();

//server static file
app.use(express.static(path.join(__dirname, "build")));

//middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//connect to mongoDB
mongoose.connect(process.env.DB_CONNECT, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const { connection } = mongoose;

connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", function () {
  console.log("database connection established successfully");
});
app.get("/home", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "build", "index.html"));
});
app.use("/posts", postRoutes);

app.set("port", process.env.PORT || 8080);
app.listen(app.get("port"), () =>
  console.log("server is now running on " + app.get("port"))
);
