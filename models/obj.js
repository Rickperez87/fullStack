const mongoose = require("mongoose");

const objSchema = mongoose.Schema({
  room: String,
  lastCleanedDate: [Date],
});
const Obj = mongoose.model("obj", objSchema);

module.exports.Obj = Obj;
