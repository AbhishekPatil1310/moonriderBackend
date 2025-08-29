

import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  ORDERNUMBER: { type: Number, required: true },
  QUANTITYORDERED: { type: Number, required: true },
  PRICEEACH: { type: Number, required: true },
  ORDERLINENUMBER: { type: Number, required: true },
  SALES: { type: Number, required: true },
  QTR_ID: { type: Number, required: true },
  MONTH_ID: { type: Number, required: true },
  YEAR_ID: { type: Number, required: true },
  PRODUCTLINE: { type: String, required: true },
  MSRP: { type: Number, required: true },
  PRODUCTCODE: { type: String, required: true },
  CUSTOMERNAME: { type: String, required: true },
  PHONE: { type: String, required: true },
  ADDRESSLINE1: { type: String, required: true },
  CITY: { type: String, required: true },
  STATE: { type: String, required: true },
  POSTALCODE: { type: String, required: true },
  COUNTRY: { type: String, required: true },
  TERRITORY: { type: String, required: true },
  CONTACTLASTNAME: { type: String, required: true },
  CONTACTFIRSTNAME: { type: String, required: true },
  DEALSIZE: { type: String, required: true }
});

export default mongoose.model('Order', OrderSchema);
