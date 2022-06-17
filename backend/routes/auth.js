const express = require("express");
const router = express.Router();
const User = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const requireLogin = require("../middleware/requireLogin");

//Get all users
router.get("/", (req, res) => {
  User.find({}, (err, data) => {
    return res.status(200).json(data);
  });
});

//Protected route for signed in users
router.get("/protected", requireLogin, (req, res) => {
  res.send("Passed on our authorization!!");
});

// Signup User
router.post("/signup", async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({
      error: "Please provide all the fields",
    });
  }

  // finding the existing user
  let data = await User.findOne({ email: email });

  if (data !== null) {
    return res.json({
      error: "User already exists",
    });
  }

  bcrypt.hash(password, 12, (err, hash) => {
    const user = new User({
      name,
      email,
      password: hash,
    });

    user.save((err, data) => {
      if (data) {
        res.status(200).json({
          code: 200,
          message: "Added new user successfully!",
          user: data,
        });
      } else {
        res.status(500).json(err);
      }
    });
  });
});

router.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(422).json({
      error: "Please provide all the fields",
    });
  }

  let data = await User.findOne({ email });
  if (data === null) {
    return res.status(422).json({
      msg: "Invalid email or password",
    });
  }
  bcrypt.compare(password, data.password, (err, result) => {
    if (err) {
      res.status(500).json({
        error,
      });
    }

    if (result === true) {
      const token = jwt.sign({ _id: data._id }, process.env.JWT_SECRET);
      res.json({ token });
    } else {
      res.status(422).json({
        msg: "Invaild email or password",
      });
    }
  });
});

module.exports = router;
