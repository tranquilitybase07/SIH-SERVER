const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const stripe = require('stripe')('sk_test_CgOgPfmRPiuCpYZWXUHfXbcf00OLNaUBlI');
const uuid = require('uuid/v4');
const Bill = require("../models/billmod");

router.post('/paybill', async (req, res) => {
  const { token, billInfo } = req.body;
  try {
    const customer = await stripe.customers.create({
      email: token.email,
      source: token.id
    })
    const idempotency_key = uuid();

    const charge = await stripe.charges.create({
      amount: billInfo.due * 100,
      currency: "inr",
      customer: customer.id,
      receipt_email: token.email,
      description: "Testing STripe",

    }, { idempotency_key });
    if (charge) {
      Bill.findByIdAndUpdate(billInfo._id, { due: 0 }, (err, data) => {
        if (err) {
          console.log(err);
          res.status(400).send({
            status: 'failure'
          })
        } else {
          console.log('Txn Succesfull : ', { charge });
          res.status(201).send({
            status: 'success',
            data
          })
        }
      })
    }

  }
  catch (error) {
    console.error('Txn Faliure : ', error);
    res.status(400).send({
      status: 'faliure'
    })
  }

})


router.post("/savebill", (req, res) => {
  // current timestamp in milliseconds
  let ts = Date.now();

  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();

  // prints date & time in YYYY-MM-DD format
  console.log(date + "-" + month + "-" + month);
  let bill = new Bill({
    customerName: req.body.customerName,
    invoiceNo: Math.floor(100000 + Math.random() * 900000),
    title: req.body.title,
    product: req.body.product,
    totAmount: req.body.totAmt,
    date: date + "-" + month + "-" + year,
    paid: req.body.paid,
    due: req.body.due,
    tac: req.body.tac,
    customer_id: req.body.customer_id
  });
  bill.save(err => {
    if (err) {
      res.status(500).json({ success: false, msg: err });
    } else {
      res.json({ success: true, msg: bill });
    }
  });
});

router.get("/getallbill", (req, res) => {
  Bill.find({}, (err, bills) => {
    if (err) {
      res.send(err);
    } else {
      res.send(bills);
    }
  });
});

router.post("/getbillbydate", (req, res) => {
  var date = req.body.date;
  Bill.find({ date: date }, (err, bills) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(bills);
    }
  });
});

router.post("/billupdate", (req, res) => {
  let ts = Date.now();

  let date_ob = new Date(ts);
  let dat = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  var customerName = req.body.customerName;
  var title = req.body.title;
  var product = req.body.product;
  var totAmt = req.body.totAmt;
  var date = dat + "-" + month + "-" + year;
  var paid = req.body.paid;
  var due = req.body.due;
  Bill.findOneAndUpdate(
    { customerName: customerName },
    {
      customerName: customerName,
      title: title,
      product: product,
      totAmount: totAmt,
      date: date,
      paid: paid,
      due: due
    },
    (err, bill) => {
      if (err) {
        res.statue(500).send(err);
      } else {
        res.status(200).send(bill);
      }
    }
  );
});

router.post("/getbillbyid", (req, res) => {
  var id = req.body.id;
  Bill.findById(id, function (err, bill) {
    if (err) {
      res.status(500).json({ success: false, msg: err });
    } else {
      res.json({ success: true, msg: bill });
    }
  });
});
router.post("/getbill-custid", (req, res) => {
  console.log(req.body.custid)
  var id = req.body.custid;
  Bill.find({ customer_id: id }, function (err, bill) {
    if (err) {
      res.status(500).json({ success: false, msg: err });
    } else {
      res.json({ success: true, msg: bill });
    }
  });
});
router.post("/deleteAllbill", (req, res) => {
  Bill.deleteMany({}, err => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(400).send("deleted");
    }
  });
});

module.exports = router;
