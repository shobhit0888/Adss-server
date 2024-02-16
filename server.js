//jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const ejs = require("ejs");
// const md5 = require("md5");
const router = require("express").Router();
const User = require("./models/userModel");
const io = require("socket.io")(3000);
var cors = require("cors");
var http = require("http");

const app = express();

var server = http.createServer(app);
//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: true }));
//Static Folder
app.use(express.static("public"));
//CORS
app.use(cors());

//EJS
app.set("view engine", "ejs");

io.on("connection", (socket) => {
  console.log("connected");
});

//Connect to MongoDB Atlas
mongoose
  .connect(
    "mongodb+srv://rahulrathorese786:rathore@cluster0.ox6vwph.mongodb.net/user_db",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const user_routes = require("./routes/userRoute");

app.use("/api", user_routes);
// app.use("/api", router);

//Server Listening On Port 3100
// app.listen(3100, function () {
//   console.log("Server Started On Port 3100");
// });

// define port
const port = process.env.PORT || 3100;
// start the server using the server.listen() method
server.listen(port, "0.0.0.0", () => {
  console.log(`Server is running on port: ${port}`);
});
