const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    gender: {
      type: String,
      required: true,
    },
    productName: {
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

const ProductModel = mongoose.model("productstest14", ProductSchema);
module.exports = ProductModel;
