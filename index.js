const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://shubham:navigater@1@cluster0-ejye1.mongodb.net/test?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(console.log("connected to the database"))
  .catch(err => {
    console.log(err);
  });

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const auth = require("./routes/auth");
app.use("/auth", auth);

const bill = require("./routes/bill");
app.use("/bill", bill);

const port = process.env.PORT || 3000;

app.listen(port, console.log(`the server started at ${port}`));
