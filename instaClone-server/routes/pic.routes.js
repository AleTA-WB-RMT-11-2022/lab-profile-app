const router = require("express").Router();
const mongoose = require("mongoose");
const Profile = require("../models/Profile.model.js");
const Pic = require("../models/Pic.model.js");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.post('/pic/:profileId', isAuthenticated, ( req, res, next ) => {
    const { profileId } = req.params

    if (!mongoose.Types.ObjectId.isValid(profileId)) {
        res.status(400).json({ message: "Specified profile id is not valid" });
        return;
      }

    Pic.create({...req.body, owner: profileId})
    .then((newPic) => {
        Profile.findByIdAndUpdate({ _id: profileId }, { $push: { pics: newPic._id } }, { new: true })
        .then((updatedProfile) => res.json(updatedProfile))
    })
})


module.exports = router;