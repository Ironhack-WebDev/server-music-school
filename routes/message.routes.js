const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Message = require("../models/Message.model");


//  POST /api/messages  -  Creates a new message
router.post("/messages", (req, res, next) => {
  const { title, message } = req.body;

  let senderData = {};

  if (req.user) {
    senderData.sender = req.user._id;
  } else {
    const { senderName, senderEmail } = req.body;
    senderData.senderName = senderName;
    senderData.senderEmail = senderEmail;
  }

  const messageData = {
    title,
    message,
    ...senderData,
    recipient: req.body.recipient
  };

  Message.create(messageData)
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});



//  GET /api/messages/:messageId -  Retrieves a specific message by id
router.get("/messages/:messageId", async (req, res, next) => {
  const { messageId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(messageId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Message.findById(messageId)
    .populate("sender")
    .populate("recipient")
    .then((message) => {
      if (!message) {
        return res.status(404).json({ message: "Message not found" });
      }
      res.status(200).json(message);
    })
    .catch((error) => res.json(error));
});


// DELETE  /api/messages/:messageId  -  Deletes a specific message by id
router.delete("/messages/:messageId", (req, res, next) => {
  const { messageId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(messageId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Message.findByIdAndRemove(messageId)
    .then(() =>
      res.json({
        message: `Message with ${messageId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
