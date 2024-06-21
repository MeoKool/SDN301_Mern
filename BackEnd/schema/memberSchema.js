const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    memberName: {
      type: String,
      required: true,
      unique: [true, "memberName already exists"],
    },
    password: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    yob: {
      type: Date,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = userSchema;
