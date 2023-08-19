const router = require("express").Router();
const mongoose = require("mongoose");
const Profile = require("../models/Profile.model");
const Pic = require("../models/Pic.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const getHashtagsArray = require("../utils/getHashtagsArray")
const cleanEmptyStringKeys = require("../utils/cleanEmptyStringKeys")


router.get("/", isAuthenticated, (req, res, next) => {

  Profile.find()
    .then((result) => {
      res.json(result);
    })
    .catch((err) => console.log(`error searching`, err));
});

module.exports = router;