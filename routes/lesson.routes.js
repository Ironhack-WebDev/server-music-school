const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


const User = require("../models/User.model");
const Lesson = require("../models/Lesson.model");

//  POST /api/lessons  -  Creates a new lesson
router.post("/lessons", async (req, res, next) => {
  const { userId, time, length, instrumentId } = req.body;

  console.log("Request Body:", req.body); // Log the entire request body

  Lesson.create({ user: userId, time, length, instrument: instrumentId })
    .then((createdLesson) => {
      console.log("Created Lesson:", createdLesson); // Log the created lesson object
      res.json(createdLesson);
    })
    .catch((err) => {
      console.error("Error creating lesson:", err); // Log the error
      res.status(500).json(err); // Return an error response
    });
});


//  GET /api/lessons -  Retrieves all of the lessons
router.get("/lessons", async (req, res, next) => {
  Lesson.find()
    .then((allLessons) => res.json(allLessons))
    .catch((err) => res.json(err));
});

//  GET /api/lessons/:lessonId -  Retrieves a specific lesson by id
router.get("/lessons/:lessonId", async (req, res, next) => {
  const { lessonId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(lessonId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Lesson.findById(lessonId)

    .then((lesson) => res.status(200).json(lesson))
    .catch((error) => res.json(error));
});

// PUT  /api/lessons/:lessonId  -  Updates a specific lesson by id
router.put("/lessons/:lessonId", (req, res, next) => {
  const { lessonId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(lessonId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Lesson.findByIdAndUpdate(lessonId, req.body, { new: true })
    .then((updatedLesson) => res.json(updatedLesson))
    .catch((error) => res.json(error));
});

// DELETE  /api/lessons/:lessonId  -  Deletes a specific lesson by id
router.delete("/lessons/:lessonId", (req, res, next) => {
  const { lessonId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(lessonId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Lesson.findByIdAndRemove(lessonId)
    .then(() =>
      res.json({
        message: `Lesson with ${lessonId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
