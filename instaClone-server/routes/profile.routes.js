const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model.js");
const Profile = require("../models/Profile.model.js");
const Pic = require("../models/Pic.model.js");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

// create a new Profile
router.post("/profiles", isAuthenticated, (req, res, next) => {
  // check if profileName is aready taken --> needs to be unique
  Profile.findOne({ profileName: req.body.profileName })
    .then((foundProfile) => {
      if (foundProfile) {
        res.status(400).json({ message: "Profile name already taken!" });
        next();
      }
      return Profile.create({ ...req.body, owner: req.payload._id });
    })
    .then((newProfile) => {
      User.findById(req.payload._id)
        .then((user) => {
          user.profiles.push(newProfile._id);
          user.save();
        })
        .then(() => res.json(newProfile));
    })
    .catch((err) => console.log("error creating new profile", err));
});

// get all Profiles by query object, without populate followers and pics( frontend shows only length )
router.get("/profiles", isAuthenticated, (req, res, next) => {
  Profile.find({owner: req.payload._id})
    .then((response) => res.json(response))
    .catch((err) => console.log(`error getting profiles`, err));
});

// get all data for specific Profile (populate data for followers, followed and pics realated)
router.get("/:profileId", isAuthenticated, (req, res, next) => {
  const { profileId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(profileId)) {
    res.status(400).json({ message: "Specified profile id is not valid" });
    return;
  }

  Profile.findById(profileId)
    .populate("pics", "followers", )// "followed" and "followers" can't populate on same line same Ref --> "Profile"
    .populate("followed")
    .then((profile) => {
      console.log(profile)
      res.json(profile)})     
    .catch((err) => console.log(`error getting profile ${profileId}`, err));
});

//update specific Profile
router.put("/:profileId/edit", isAuthenticated, (req, res, next) => {
  const { profileId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(profileId)) {
    res.status(400).json({ message: "Specified profile id is not valid" });
    return;
  }

  Profile.findByIdAndUpdate(profileId, req.body, { new: true })
    .then((profile) => res.json(profile))
    .catch((err) => console.log(`error updating profile ${req.params}`, err));
});

// delete Profile, remove profile from user[profiles] and delete all pics related to Profile
router.delete("/:profileId", isAuthenticated, (req, res, next) => {
  const { profileId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(profileId)) {
    res.status(400).json({ message: "Specified profile id is not valid" });
    return;
  }

  Profile.findByIdAndRemove(profileId)
    .then(() => {
        User.findOneAndUpdate({ _id: req.payload._id }, { $pull: { profile: profileId } }, { new: true })
        .then((updatedUser) => {
          Pic.deleteMany({ owner: profileId })
          .then(() => res.status(200).json({ message: "Profile successfully deleted" }))
      })
    })
    .catch((err) => {
      res.status(400).json({ message: "Something went wrong..." })
    })
});

module.exports = router;
