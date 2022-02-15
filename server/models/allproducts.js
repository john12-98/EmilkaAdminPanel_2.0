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

const AllGarmentModel = mongoose.model("productstest14", AllGarment);
module.exports = AllGarmentModel;
