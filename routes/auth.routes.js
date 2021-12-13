const express = require("express");
const router = express.Router();

//we installed bcrypt.js
const bcrypt = require("bcryptjs");

const UserModel = require("../models/User.model");

router.post("/signup", (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    image,
    userDreams,
    addressline,
    zipCode,
    city,
    state,
    country,
  } = req.body;
  console.log(firstName, email, password);

  // -----SERVER SIDE VALIDATION ----------
  /* 
    if (!username || !email || !password) {
        res.status(500)
          .json({
            errorMessage: 'Please enter username, email and password'
          });
        return;  
    }
    const myRegex = new RegExp(/^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/);
    if (!myRegex.test(email)) {
        res.status(500).json({
          errorMessage: 'Email format not correct'
        });
        return;  
    }
    const myPassRegex = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/);
    if (!myPassRegex.test(password)) {
      res.status(500).json({
        errorMessage: 'Password needs to have 8 characters, a number and an Uppercase alphabet'
      });
      return;  
    }
    */

  // NOTE: We have used the Sync methods here.
  // creating a salt
  let salt = bcrypt.genSaltSync(10);
  let hash = bcrypt.hashSync(password, salt);
  UserModel.create({
    firstName,
    lastName,
    email,
    password: hash,
    image,
    userDreams,
    addressline,
    zipCode,
    city,
    state,
    country,
  })
    .then((user) => {
      // ensuring that we don't share the hash as well with the user
      user.password = "***";
      req.session.loggedInUser = user;
      res.status(200).json(user);
    })
    .catch((err) => {
      if (err.code === 11000) {
        res.status(500).json({
          errorMessage: "username or email entered already exists!",
          message: err,
        });
      } else {
        res.status(500).json({
          errorMessage: "Something went wrong! Please try again!",
          message: err,
        });
      }
    });
});

// will handle all POST requests to http:localhost:5005/api/signin
router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  // -----SERVER SIDE VALIDATION ----------
  /*
    if ( !email || !password) {
        res.status(500).json({
            error: 'Please enter Username. email and password',
       })
      return;  
    }
    const myRegex = new RegExp(/^[a-z0-9](?!.*?[^\na-z0-9]{2})[^\s@]+@[^\s@]+\.[^\s@]+[a-z0-9]$/);
    if (!myRegex.test(email)) {
        res.status(500).json({
            error: 'Email format not correct',
        })
        return;  
    }
    */

  // Find if the user exists in the database
  UserModel.findOne({ email })
    .then((userData) => {
      //check if passwords match
      let doesItMatch = bcrypt.compareSync(password, userData.password);
      //if it matches
      if (doesItMatch) {
        // req.session is the special object that is available to you
        userData.passwordHash = "***";
        req.session.loggedInUser = userData;
        res.status(200).json(userData);
      }
      //if passwords do not match
      else {
        res.status(500).json({
          error: "Passwords don't match",
        });
        return;
      }
    })
    //throw an error if the user does not exists
    .catch((err) => {
      res.status(500).json({
        error: "Email does not exist",
        message: err,
      });
      return;
    });
});

// will handle all POST requests to http:localhost:5005/api/logout
router.post("/logout", (req, res) => {
  req.session.destroy();
  // Nothing to send back to the user
  res.status(204).json({});
});

// middleware to check if user is loggedIn
const isLoggedIn = (req, res, next) => {
  if (req.session.loggedInUser) {
    //calls whatever is to be executed after the isLoggedIn function is over
    next();
  } else {
    res.status(401).json({
      message: "Unauthorized user",
      code: 401,
    });
  }
};

router.get("/:userId/edit", (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

// THIS IS A PROTECTED ROUTE
// will handle all get requests to http:localhost:5005/api/user
router.get("/user", isLoggedIn, (req, res, next) => {
  res.status(200).json(req.session.loggedInUser);
});

router.get("/users/:id", (req, res, next) => {
  const { id } = req.params;
  UserModel.findById(id)
    .then((user) => {
      res.status(200).json(user);
    })
    .catch((err) => {
      res.status(500).json({
        error: "Something went wrong",
        message: err,
      });
    });
});

module.exports = router;
