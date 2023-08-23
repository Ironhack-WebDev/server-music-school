const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const MessageSchema = new Schema({
  title: { type: String },
  message: { type: String },
  sender: {
    type: Schema.Types.ObjectId,
    ref: "user",
    default: null,
  },
  senderName: { type: String }, 
  senderEmail: { type: String },
  recipient: { type: Schema.Types.ObjectId, ref: "user" },
  timeStamp: { type: Date, default: Date.now },
});

module.exports = model("Message", MessageSchema);
