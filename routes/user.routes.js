const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
const Instrument = require("../models/Instrument.model");
const Group = require("../models/Group.model");
const Message = require("../models/Message.model");

// GET /api/users/:userId - Retrieves a specific user by its id
router.get("/users/:userId", async (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  try {
    const user = await User.findOne({ _id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// PUT /api/users/:userId - Updates a specific user by its id
router.put("/users/:userId", async (req, res, next) => {
  const { userId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: req.body },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});



// GET /api/users/:userId/groups - get the groups linked to specific user
router.get("/users/:userId/groups", async (req, res, next) => {
    const { userId } = req.params;
  
    try {
      const groups = await Group.find({
        members: userId,
      });
  
      const groupData = groups.map((group) => {
        return {
          title: group.title,
          startTime: group.startTime,
          location: group.location,
        };
      });
  
      res.status(200).json(groupData);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
});

// GET /api/users/:userId/messages - get the messages linked to specific user
router.get("/users/:userId/messages", async (req, res, next) => {
    const { userId } = req.params;
  
    try {
      const messages = await Message.find({
        recipient: userId,
      });
  
      const messageData = messages.map((message) => {
        let senderInfo = message.sender;
        if (!senderInfo) {
          senderInfo = {
            name: message.senderName,
            email: message.senderEmail,
          };
        }
        
        return {
          title: message.title,
          message: message.message,
          sender: senderInfo,
        };
      });
  
      res.status(200).json(messageData);
    } catch (error) {
      res.status(500).json({ message: "Internal server error" });
    }
});


// GET /api/users/:userId/lessons - get the lessons linked to specific user
/*router.get("/users/:userId/lessons", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const instruments = await Instrument.find({
      "lessons.user": userId,
    });

    const lessons = instruments.flatMap((instrument) => {
      return instrument.lessons
        .filter((lesson) => lesson.user.toString() === userId)
        .map((lesson) => {
          return {
            instrument: instrument.instrumentName,
            time: lesson.time,
            length: lesson.length,
          };
        });
    });

    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});*/



module.exports = router;
