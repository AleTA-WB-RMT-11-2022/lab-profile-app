const router = require("express").Router();
const mongoose = require("mongoose");
const Profile = require("../models/Profile.model");
const Pic = require("../models/Pic.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const getHashtagsArray = require("../utils/getHashtagsArray")
const cleanEmptyStringKeys = require("../utils/cleanEmptyStringKeys")


router.get("/search", isAuthenticated, (req, res, next) => {
    const {query} = req.query
    console.log(req.query)
    .catch((err) => console.log(`error searching`, err));
})

module.exports = router;