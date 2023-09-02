const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Message = require("../models/Message.model");

// GET /api/messages - get all messages - FOR TESTING
router.get ("/messages", async (req, res,next) => {
  Message.find()
  .then ((allMessages) => res.json(allMessages))
  .catch((err)=> res.json(err));
});


//  POST /api/messages  -  Creates a new message
router.post("/messages", (req, res, next) => {
  const { title, message, sender, senderName, senderEmail, recipient } = req.body;

  const messageData = {
    title,
    message,
    sender,
    senderName,
    senderEmail,
    recipient
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


// GET /api/users/messages?userId=${userId} - get the messages linked to specific user
router.get("/users/messages", async (req, res, next) => {
  const { userId } = req.query;

  try {
    const messages = await Message.find({
      recipient: userId,
    });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


// GET /api/users/messages?userId=${userId} - get the messages send by specific user
router.get("/users/messages/sent", async (req, res, next) => {
  const { userId } = req.query;

  try {
    const messages = await Message.find({
      sender: userId,
    });

    res.json(messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});


module.exports = router;
