const express = require("express");
const router = express.Router();

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

module.exports = router;
