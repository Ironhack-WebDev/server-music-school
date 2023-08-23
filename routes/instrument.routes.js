const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Instrument = require("../models/Instrument.model");

//  POST /api/instruments  -  Creates a new instrument
router.post("/instruments", (req, res, next) => {
  const { instrumentName, teacher, description, location } = req.body;

  Instrument.create({ instrumentName, teacher, description, location })
    .then((response) => res.json(response))
    .catch((err) => res.json(err));
});

//  GET /api/instruments -  Retrieves all of the instruments
router.get("/instruments", async (req, res, next) => {
  Instrument.find()
    .then((allInstruments) => res.json(allInstruments))
    .catch((err) => res.json(err));
});

//  GET /api/instruments/:instrumentId -  Retrieves a specific instrument by id
router.get("/instruments/:instrumentId", async (req, res, next) => {
  const { instrumentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(instrumentId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Instrument.findById(instrumentId)

    .then((instrument) => res.status(200).json(instrument))
    .catch((error) => res.json(error));
});

// PUT  /api/instruments/:instrumentId  -  Updates a specific instrument by id
router.put("/instruments/:instrumentId", (req, res, next) => {
  const { instrumentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(instrumentId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Instrument.findByIdAndUpdate(instrumentId, req.body, { new: true })
    .then((updatedInstrument) => res.json(updatedInstrument))
    .catch((error) => res.json(error));
});

// DELETE  /api/instruments/:instrumentId  -  Deletes a specific instrument by id
router.delete("/instruments/:instrumentId", (req, res, next) => {
  const { instrumentId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(instrumentId)) {
    res.status(400).json({ message: "Specified id is not valid" });
    return;
  }

  Instrument.findByIdAndRemove(instrumentId)
    .then(() =>
      res.json({
        message: `Instrument with ${instrumentId} is removed successfully.`,
      })
    )
    .catch((error) => res.json(error));
});

module.exports = router;
