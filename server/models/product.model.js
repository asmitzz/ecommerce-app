const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
      maxlength: 32
    },
    description: {
      type: String,
      trim: true,
      required: true,
      maxlength: 2000
    },
    price: {
      type: Number,
      required: true,
      maxlength: 32,
      trim: true
    },
    stock: {
      type: Number
    },
    sold: {
      type: Number,
      default: 0
    },
    image: {
      type:String
    },
    fastDelivery:{
        type: Boolean
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
