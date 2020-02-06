const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

const Middle = require("../models/middlemod");

router.post('/send', (req, res) => {
    let customer_id = req.body.customer_id;
    let bill_id = req.body.bill_id;

    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let time = date_ob.getTime();
    let middleDetail = new Middle({
        customer_id,
        bill_id,
        date: date + "-" + month + "-" + year,
        time: time,
        double_click: '0'
    })

    //check if it's not already saved 
    Middle.find({ customer_id, bill_id }, (err, data) => {
        if (data == null || data == undefined || data.length == 0) {
            //save
            middleDetail.save((err, data) => {
                if (err) {
                    res.send(err);
                } else {
                    res.send(data)
                }

            })
        }
        else {
            res.send('AlreadySaved')
        }
    })
})

router.post('/getbyclient', (req, res) => {
    Middle.find({ customer_id: req.body.customer_id }, (err, middle) => {
        if (err) { res.send(err) }
        res.send(middle)
    })
})


router.post('/getbybill', (req, res) => {
    Middle.find({ bill_id: req.body.bill_id }, (err, middle) => {
        if (err) { res.send(err) }
        res.send(middle)
    })
})

module.exports = router;
