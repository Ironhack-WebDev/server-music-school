const router = require("express").Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");
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
    const user = await User.findOne({ _id: userId }).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});


//  GET /api/users -  Retrieves all of the users
router.get("/users", async (req, res, next) => {
  try {
    const allUsers = await User.find().select("-password");
    res.json(allUsers);
  } catch (err) {
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
    const user = await User.findById(userId).populate("groups");

    return res.status(200).json(user.groups);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// POST /api/groups/:groupId   - add user to group

router.post("/groups/:groupId/join", async (req, res) => {
  try {
    if (!loggedIn) {
      return res
        .status(401)
        .json({ message: "Please log in to join this group" });
    }

    const groupId = req.params.groupId;

    const user = await User.findById(loggedInUserId);
    const group = await Group.findById(groupId);

    if (group.members.includes(loggedInUserId)) {
      return res.status(400).json({ message: "You are already in this group" });
    }

    user.groups.push(groupId);
    group.members.push(loggedInUserId);

    await user.save();
    await group.save();

    return res.status(200).json({ message: "User joined the group" });
  } catch (error) {
    console.error("Error while adding user to group:", error);
    return res.status(500).json({ message: "Internal server error" });
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

module.exports = router;
