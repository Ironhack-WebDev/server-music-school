const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Group = require("../models/Group.model");

//  POST /api/groups  -  Creates a new group
router.post("/groups", (req, res, next) => {
  const { title, startTime, endTime, location, leader, imageURL } = req.body;

  Group.create({ title, startTime, endTime, location, leader, imageURL })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /api/groups -  Retrieves all of the groups
router.get("/groups", async (req, res, next) => {
  Group.find()
    .then((allGroups) => res.json(allGroups))
    .catch((err) => res.json(err));
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
