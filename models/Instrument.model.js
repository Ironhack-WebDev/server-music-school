const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const InstrumentSchema = new Schema({
  instrumentName: { type: String, required: true },
  teacher: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  imageURL: { type: String },
});

module.exports = model("instrument", InstrumentSchema);
