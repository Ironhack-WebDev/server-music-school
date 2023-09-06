const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const messageSchema = new Schema({
  title: { type: String },
  message: { type: String },
  sender: { type: Schema.Types.ObjectId, ref: "User" },
  senderName: { type: String },
  senderEmail: { type: String },
  recipient: [{ type: Schema.Types.ObjectId, ref: "User" }],
  timeStamp: { type: Date, default: Date.now },
});

const Message = model("Message", messageSchema);

module.exports = Message;
