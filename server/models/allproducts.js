const mongoose = require("mongoose");

const AllGarment = new mongoose.Schema(
  {
    gender: {
      type: String,
      required: true,
    },
    garmentName: {
      type: String,
      required: true,

      //trim: true,
    },
    size: { type: Array },
    categories: { type: String },
    imgUrl: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: { type: Number, required: true },
  },
  { timestamps: true }
);

const AllGarmentModel = mongoose.model("productstest13", AllGarment);
module.exports = AllGarmentModel;
