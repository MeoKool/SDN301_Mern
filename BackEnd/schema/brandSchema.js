const mongoose = require("mongoose");

const brandsSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = brandsSchema;
