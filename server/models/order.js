const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    customer: {
      type: String,
      required: true,
    },

    product: {
      name: { type: String },
      imgUrl: { type: String },
      description: { type: String },
      price: { type: Number },
      quantity: { type: Number, default: 1 },
      size: { type: String },
    },
    phone: { type: String },
  },
  { timestamps: true }
);

const OrderModel = mongoose.model("ordertest14", OrderSchema);
module.exports = OrderModel;
