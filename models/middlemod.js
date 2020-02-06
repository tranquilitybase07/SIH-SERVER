const mongoose = require("mongoose");

const MiddleSchema = mongoose.Schema({
    customer_id: {
        type: String,
        required: true
    },
    bill_id: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String
    },
    double_tick: {
        type: String
    }
});
const Middle = (module.exports = mongoose.model("Middle", MiddleSchema));
