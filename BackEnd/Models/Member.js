const mongoose = require("mongoose");

const userSchema = require("../schema/memberSchema");

module.exports = mongoose.model("Member", userSchema);
