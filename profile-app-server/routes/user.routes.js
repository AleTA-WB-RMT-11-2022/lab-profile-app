const router = require("express").Router();
const User = require("../models/User.model.js");
const { isAuthenticated } = require('./../middleware/jwt.middleware.js')

router.get("/users", (req, res, next) => {
    console.log(`req.payload`, req.payload);
    User.findById(req.payload._id)
    .then((res) => res.json(res))
    .catch((err) => console.log('error getting current user from DB', err))


})

module.exports = router;