const mongoose = require("mongoose");

const BillSchema = mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  customer_id: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: false
  },
  invoiceNo: {
    type: Number,
    required: false
  },
  product: {
    type: Array,
    required: false
  },
  title: {
    type: String,
    required: false
  },
  products: {
    type: String,
    required: false
  },
  totAmount: {
    type: String,
    required: false
  },
  date: {
    type: String,
    required: false
  },
  paid: {
    type: String,
    required: false
  },
  due: {
    type: String,
    required: false
  },
  tac: {
    type: String,
    required: false
  }
});
const Bill = (module.exports = mongoose.model("Bill", BillSchema));
