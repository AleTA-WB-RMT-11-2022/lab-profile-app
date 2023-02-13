const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model.js");
const Profile = require("../models/Profile.model.js");
const Pic = require("../models/Pic.model.js");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.put('/follow/:profileId/:followedId',isAuthenticated, ( req, res, next ) => {
    const { profileId, followedId } = req.params;
    
    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      res.status(400).json({ message: "Specified profile id is not valid" });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(followedId)) {
        res.status(400).json({ message: "Specified followed profile id is not valid" });
        return;
    }
    // push the id of the profile user wants to follow in user Profile
    Profile.findOneAndUpdate({ _id: profileId }, { $push: { followed: followedId } }, { new: true })
    .then((updateProfile) => {
        // push user Profile id as a follower in followed profile
        Profile.findOneAndUpdate({ _id: followedId }, { $push: { followers: profileId } }, { new: true })
        .then(() => res.json(updateProfile)) // return the updted user Profile
    })
    .catch((err) => {
        res.status(400).json({ message: "Something went wrong..." })
      })

})

module.exports = router;