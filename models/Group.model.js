const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const groupSchema = new Schema({
  title: { type: String, required: true  },
  startTime: { type: String, required: true },
  endTime: { type: Time },
  location: { type: String },
  leader: { type: String },
  imageURL: { type: String },
  members: [{ type: Schema.Types.ObjectId, ref: "user" }]
});

module.exports = model("Group", groupSchema);