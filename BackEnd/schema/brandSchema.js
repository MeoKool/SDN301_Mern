const mongoose = require("mongoose");

const brandsSchema = new mongoose.Schema(
  {
    brandName: {
      type: String,
      required: [true, "Name is required"],
      unique: true,
    },
    watches: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Watches",
      },
    ],
  },
  { timestamps: true }
);

module.exports = brandsSchema;
