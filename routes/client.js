const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Client = require("../models/clientmod");

router.post("/addClient", (req, res) => {
  let newClient = new Client({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
    password: req.body.password,
    wallet_id: Math.floor(100000 + Math.random() * 900000)
  });
  Client.addClient(newClient, err => {
    if (err) {
      res.json({ sucsess: false, msg: err });
    } else {
      res.json({ sucsess: true, msg: newClient });
    }
  });
});

router.post("/client-login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(req.body.email, req.body.password);
  Client.getUserByUsername(email, function(err, user) {
    if (err) throw err;
    if (!user) {
      return res.json({ success: false, msg: "User not found" });
    }
    Client.comparePassword(password, user.password, function(err, isMatch) {
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

router.get("/getallclient", (req, res) => {
  Client.find({}, (err, client) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(client);
    }
  });
});

router.post("/getclientbyid", (req, res) => {
  var id = req.body.id;
  Client.findById(id, function(err, client) {
    if (err) {
      res.status(500).json({ success: false, msg: err });
    } else {
      res.json({ success: true, msg: client });
    }
  });
});

router.post("/updateclient", (req, res) => {
  var name = req.body.name;
  var email = req.body.email;
  var phone = req.body.phone;
  var address = req.body.address;
  Client.findOneAndUpdate(
    { email: email },
    {
      name: name,
      email: email,
      phone: phone,
      address: address
    },
    (err, client) => {
      if (err) {
        res.statue(500).send(err);
      } else {
        res.status(200).send(client);
      }
    }
  );
});

router.post("/deleteclient", (req, res) => {
  var email = req.body.email;
  Client.deleteOne({ email: email }, err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(400).send("deleted");
    }
  });
});

router.post("/deleteAllclient", (req, res) => {
  Client.deleteMany({}, err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(400).send("deleted");
    }
  });
});

module.exports = router;
