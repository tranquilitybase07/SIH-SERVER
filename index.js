const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");


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
app.use(cors());

const auth = require("./routes/auth");
app.use("/auth", auth);

const bill = require("./routes/bill");
app.use("/bill", bill);

const client = require("./routes/client");
app.use("/client", client);

const middle = require("./routes/middle");
app.use("/middle", middle);

const port = process.env.PORT || 5000;

app.listen(port, console.log(`the server started at ${port}`));
