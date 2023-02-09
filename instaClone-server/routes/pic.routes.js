const router = require("express").Router();
const Pic = require("../models/Pic.model.js");
const { isAuthenticated } = require('../middleware/jwt.middleware.js')



module.exports = router;