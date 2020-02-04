const express = require("express");
const router = express.Router();

router.get("/lop", (req, res) => {
  res.send("client");
});

module.exports = router;
