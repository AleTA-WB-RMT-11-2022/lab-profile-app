const router = require("express").Router();
const mongoose = require("mongoose");
const User = require("../models/User.model");
const Profile = require("../models/Profile.model");
const Pic = require("../models/Pic.model");
const { isAuthenticated } = require("../middleware/jwt.middleware");
const cleanEmptyStringKeys = require("../utils/cleanEmptyStringKeys")

// create a new Profile
router.post("/", isAuthenticated, (req, res, next) => {
  // check if profileName is aready taken --> needs to be unique
  Profile.findOne({ profileName: req.body.profileName })
    .then((foundProfile) => {
      if (foundProfile) {
        res.status(401).json({ message: "Profile name already taken!" });
        return;
      }
      return Profile.create({
        ...cleanEmptyStringKeys(req.body),
        owner: req.payload._id,
      })
        .then((newProfile) => {
          console.log("step 2 line 25");
          return User.findByIdAndUpdate(
            req.payload._id,
            { $push: { profiles: newProfile._id } },
            { new: true }
          );
        })
        .then((updatedUser) => {
          console.log("step 3 line 33");
          const { _id, email, profiles } = updatedUser;
          res.json({ _id, email, profiles });
        });
    })
    .catch((err) => {
      console.log("error creating profile", err);
      res.status(400).json({ message: "Profile not created" });
      next(err);
    });
});

// get all profiles but current user's , sorted by last updatd
router.get("/", isAuthenticated, (req, res, next) => {
  Profile.find({owner: { $nin: req.payload._id }} ).sort({ 'updatedAt': -1 })
    .then((response) => {
      res.json(response)})
    .catch((err) => console.log(`error getting profiles`, err));
});

// get all Profiles of current user, without populate followed and pics( frontend shows only length )
router.get("/my-profiles", isAuthenticated, (req, res, next) => {
  Profile.find({owner: req.payload._id})
    .then((response) => res.json(response))
    .catch((err) => console.log(`error getting my-profiles`, err));
});

// get all data for specific Profile (populate followers, followed and pics realated)
router.get("/:profileId", isAuthenticated, (req, res, next) => {
  const { profileId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(profileId)) {
    res.status(400).json({ message: "Specified profile id is not valid" });
    return;
  }

  Profile.findById(profileId)
    .populate({
      path: 'pics',
      options: { sort: { 'createdAt': -1 } } // last created first
    })// "followed" and "followers" can't populate on same line same Ref --> "Profile"
    .populate("followers")
    .populate("followed")
    .then((profile) => res.json(profile))     
    .catch((err) => console.log(`error getting profile ${profileId}`, err));
});

//update specific Profile
router.put("/:profileId/edit", isAuthenticated, (req, res, next) => {
  const { profileId } = req.params;
  if (!mongoose.Types.ObjectId.isValid(profileId)) {
    res.status(400).json({ message: "Specified profile id is not valid" });
    return;
  }

  Profile.findByIdAndUpdate(profileId, ...cleanEmptyStringKeys(req.body), { new: true })
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

  return Profile.findByIdAndRemove(profileId)
    .then(() => {
      return Pic.deleteMany({ owner: profileId });
    })
    .then(() => {
      return User.findOneAndUpdate(
        { _id: req.payload._id },
        { $pull: { profiles: profileId } },
        { new: true }
      );
    })
    .then((updatedUser) => {
      const { _id, email, profiles } = updatedUser
      res.json({ _id, email, profiles })}
    )
    .catch((err) => {
      res.status(400).json({ message: "Something went wrong..." });
    });
});

module.exports = router;
