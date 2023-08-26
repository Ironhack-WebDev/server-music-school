const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const LessonSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "user" },
  time: { type: String },
  length: { type: Number },
  instrument: { type: Schema.Types.ObjectId, ref: "Instrument" },
});

module.exports = model("Lesson", LessonSchema);
