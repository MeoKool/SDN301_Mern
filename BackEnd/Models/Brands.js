const mongoose = require("mongoose");

const brandsSchema = require("../schema/brandSchema");

module.exports = mongoose.model("Brands", brandsSchema);
