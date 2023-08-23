const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const InstrumentSchema = new Schema({
  instrumentName: { type: String, required: true },
  teacher: { type: String, required: true },
  description: { type: String },
  location: { type: String },
  imageURL: { type: String },
  lessons: [
    {
      user: { type: Schema.Types.ObjectId, ref: "user" },
      time: { type: String },
      length: { type: Number },
    },
  ],
});

module.exports = model("instrument", InstrumentSchema);
