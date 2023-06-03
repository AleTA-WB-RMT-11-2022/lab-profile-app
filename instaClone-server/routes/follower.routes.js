const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model.js");
const Profile = require("../models/Profile.model.js");
const Pic = require("../models/Pic.model.js");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.get(
  "/follow/:profileId/:followedId", (req, res, next) => {
    // profileId = profile of the current user - followedId = profile the user choose to follow
    const { profileId, followedId } = req.params;

    if (!mongoose.Types.ObjectId.isValid(profileId)) {
      res.status(400).json({ message: "Specified profile id is not valid" });
      return;
    }
    if (!mongoose.Types.ObjectId.isValid(followedId)) {
      res
        .status(400)
        .json({ message: "Specified followed profile id is not valid" });
      return;
    }
    // add the profile user id who wants to follow in user Profile only if not already in array
    return Profile.findOneAndUpdate(
      { _id: profileId },
      { $addToSet: { followed: followedId } },
      { new: true }
    )
      .then((updatedProfile) => {
        // add user Profile id as a follower in followed user profile only if not already in array
        return Profile.findOneAndUpdate(
          { _id: followedId },
          { $addToSet: { followers: profileId } },
          { new: true }
        ).then(() => res.json(updatedProfile)); // return the updted user Profile
      })
      .catch((err) => {
        res.status(400).json({ message: "Something went wrong..." });
      });
  }
);

module.exports = router;
