const mongoose = require("mongoose");
const commentSchema = require("../schema/commentSchema");

module.exports = mongoose.model("Comment", commentSchema);
