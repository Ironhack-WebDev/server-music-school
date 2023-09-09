const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const groupSchema = new Schema({
  title: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String },
  location: { type: String },
  leader: { type: String },
  imageURL: { type: String },
  day: { type: String },
  skillLevel: { type: String },
  instruments: { type: Array },
  description: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

const Group = model("Group", groupSchema);

module.exports = Group;
