const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const path = require("path");
const user_controller = require("../controllers/userControllers");

const user_routes = express();

// Body Parser Middleware
user_routes.use(bodyParser.urlencoded({ extended: true }));
user_routes.use(bodyParser.json());
user_routes.use(express.static("public")); // Static files

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../public/profileImage")); // Define the destination directory
  },
  filename: function (req, file, cb) {
    // Define the file name
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

// Initialize Multer with storage configuration
const upload = multer({ storage: storage });

// user_routes.post(
//   "/register",
//   upload.single("photoURL"),
//   user_controller.registered_user
// );

user_routes.post(
  "/register",
  (req, res, next) => {
    upload.single("photoURL")(req, res, (err) => {
      if (err) {
        // Handle multer upload error
        return res
          .status(400)
          .json({ error: "Photo upload failed", details: err.message });
      }
      next();
    });
  },
  user_controller.registered_user
);

// user_routes.post(
//   "/login",
//   (req, res, next) => {
//     if (!req.body.mobileNumber || !req.body.password) {
//       return res
//         .status(400)
//         .json({ message: "Mobile number or password missing" });
//     }
//     next();
//   },
//   user_controller.user_login
// );

user_routes.post("/login", user_controller.user_login);

module.exports = user_routes;
