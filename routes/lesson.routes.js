const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");


const User = require("../models/User.model");
const Lesson = require("../models/Lesson.model");

//  POST /api/lessons  -  Creates a new lesson
router.post("/lessons", async (req, res, next) => {
  const { userId, time, length, instrumentId } = req.body;

  console.log("Request Body:", req.body); 

  Lesson.create({ user: userId, time, length, instrument: instrumentId })
    .then((createdLesson) => {
      res.json(createdLesson);
    })
    .catch((err) => {
      res.status(500).json(err); 
    });
});


//  GET /api/lessons?instrument=${instrument} -  Retrieve lessons associated with an instrument
router.get("/lessons", async (req, res, next) => {
  const { instrument } = req.query;

  if (!instrument) {
    return res.status(400).json({ message: "Instrument parameter is missing." });
  }

  try {
    const lessons = await Lesson.find({ instrument: instrument }).sort({ time: 1 });
    res.json(lessons);
  } catch (error) {
    res.status(500).json({ message: "An error occurred while fetching lessons." });
  }
});


// GET /api/lessons/student?user=${user}
router.get("/lessons/student", async (req, res, next) => {
  const { user } = req.query;

  if (!user) {
    return res.status(400).json({ message: "Invalid or missing 'user' parameter." });
  }

  try {
    const lessons = await Lesson.find({ user: user });

    if (lessons.length === 0) {
      return res.status(404).json({ message: "No lessons found with this user as a member." });
    }

    res.json(lessons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching groups." });
  }
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
