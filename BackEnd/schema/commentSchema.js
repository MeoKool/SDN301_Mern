const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: [true, "content is required."],
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = commentSchema;
