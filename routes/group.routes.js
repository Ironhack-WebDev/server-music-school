const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Group = require("../models/Group.model");

//  POST /api/groups  -  Creates a new group
router.post("/groups", (req, res, next) => {
  const {
    title,
    startTime,
    endTime,
    location,
    leader,
    imageURL,
    day,
    skillLevel,
    instruments,
    description,
  } = req.body;

  Group.create({
    title,
    startTime,
    endTime,
    location,
    leader,
    imageURL,
    day,
    skillLevel,
    instruments,
    description,
  })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /api/groups -  Retrieves all of the groups
router.get("/groups", async (req, res, next) => {
  Group.find()
    .then((allGroups) => res.json(allGroups))
    .catch((err) => res.json(err));
});

//  GET /api/groups/members?user=${user} -  Retrieves a users groups
router.get("/groups/members", async (req, res, next) => {
  const { user } = req.query;

  if (!user) {
    return res
      .status(400)
      .json({ message: "Invalid or missing 'user' parameter." });
  }

  try {
    const groups = await Group.find({ members: user });

    if (groups.length === 0) {
      return res
        .status(404)
        .json({ message: "No groups found with this user as a member." });
    }

    res.json(groups);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while fetching groups." });
  }
});

// GET /api/timetable?day=${day}

router.get("/timetable", async (req, res, next) => {
  const { day } = req.query;

  if (!day) {
    return res.status(400).json({ message: "Day parameter is missing." });
  }

  try {
    const groups = await Group.find({ day: day });
    res.json(groups);
  } catch (error) {
    res
      .status(500)
      .json({ message: "An error occurred while fetching groups." });
  }
});

//  GET /api/groups/:groupId -  Retrieves a specific group by id
router.get("/groups/:groupId", async (req, res, next) => {
  const { groupId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Group.findById(groupId)

    .then((group) => res.status(200).json(group))
    .catch((error) => res.json(error));
});

// PUT  /api/groups/:groupId  -  Updates a specific group by id
router.put("/groups/:groupId", (req, res, next) => {
  const { groupId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Group.findByIdAndUpdate(groupId, req.body, { new: true })
    .then((updatedGroup) => res.json(updatedGroup))
    .catch((error) => res.json(error));
});

// PUT /api/groups/:groupId/join - user joins a group
router.put("/groups/:groupId/join", async (req, res) => {
  try {
    const { groupId } = req.params;
    const { userId } = req.body;

    const group = await Group.findById(groupId);

    if (!group) {
      return res.status(404).json({ message: "Group not found" });
    }

    if (group.members.includes(userId)) {
      return res
        .status(400)
        .json({ message: "User is already a member of this group" });
    }

    group.members.push(userId);

    await group.save();

    res.status(200).json({ message: "Joined group successfully" });
  } catch (error) {
    console.error("Error joining group:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;

// DELETE  /api/groups/:groupId  -  Deletes a specific group by id
router.delete("/groups/:groupId", (req, res, next) => {
  const { groupId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(groupId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Group.findByIdAndRemove(groupId)
    .then(() =>
      res.json({
        message: `Group with ${groupId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
