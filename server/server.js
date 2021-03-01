const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

//import env config file and configure it;
const dotenv = require("dotenv");
dotenv.config();

//local imports;
const postRoutes = require("./routes/post");

//initialize express application
const app = express();

//middlewares
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//connect to mongoDB
mongoose
  .connect(process.env.DB_CONNECT, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() =>
    app.listen(app.get("port"), () =>
      console.log(`server running on ${app.get("port")}`)
    )
  )
  .catch((error) => console.log(error.message));

const { connection } = mongoose;

connection.on("error", console.error.bind(console, "connection error:"));
connection.once("open", function () {
  console.log("database connection established successfully");
});

app.use("/posts", postRoutes);

app.set("port", process.env.PORT || 8080);
