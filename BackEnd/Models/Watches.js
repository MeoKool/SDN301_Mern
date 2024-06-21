const mongoose = require("mongoose");

const watchSchema = require("../schema/watchSchema");

module.exports = mongoose.model("Watches", watchSchema);
