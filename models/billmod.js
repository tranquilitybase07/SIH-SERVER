const mongoose = require("mongoose");

const BillSchema = mongoose.Schema({
  customerName: {
    type: String,
    required: true
  },
  status: {
    type: String
  },
  invoiceNo: {
    type: Number,
    required: true
  },
  product: {
    type: Array
  },
  title: {
    type: String
  },
  products: {
    type: String
  },
  totAmount: {
    type: String
  },
  date: {
    type: String
  },
  paid: {
    type: String
  },
  due: {
    type: String
  }
});
const Bill = (module.exports = mongoose.model("Bill", BillSchema));
