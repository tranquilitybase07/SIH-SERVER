const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post("/register", (req, res) => {
  let newUser = new User({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
    password: req.body.password
  });
  User.addUser(newUser, err => {
    if (err) {
      res.json({ sucsess: false, msg: err });
    } else {
      res.json({ sucsess: true, msg: newUser });
    }
  });
});

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body.email, req.body.password);
  User.getUserByUsername(email, function(err, user) {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: "User not found" });
    }
    User.comparePassword(password, user.password, function(err, isMatch) {
      if (err) throw err;
      if (isMatch) {
        const token = jwt.sign(user.toJSON(), "secret", {
          expiresIn: 604800
        });
        res.json({
          success: true,
          token: "JWT " + token,
          user: {
            id: user._id,
            name: user.name,
            email: user.email
          }
        });
      } else {
        return res.json({ sucess: false, msg: "Wrong Password" });
      }
    });
  });
});

module.exports = router;
