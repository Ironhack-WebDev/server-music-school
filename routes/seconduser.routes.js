const router = require("express").Router();
const mongoose = require("mongoose");

const User = require("../models/User.model");


//  GET /api/users -  Retrieves all of the users
router.get("/users", async (req, res, next) => {
    User.find()
      .then((allUsers) => res.json(allUsers))
      .catch((err) => res.json(err));
  });


module.exports = router;