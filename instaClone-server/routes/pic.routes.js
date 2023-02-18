const router = require("express").Router();
const mongoose = require("mongoose");
const Profile = require("../models/Profile.model.js");
const Pic = require("../models/Pic.model.js");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.post("/pic/:profileId", isAuthenticated, (req, res, next) => {
  const { profileId } = req.params;
  console.log(req.body)
  const getHashtags = (string) => {
    const hashtagArr = string
      .split("#")
      .map((hash) => hash.trim())
      .filter((hash) => hash !== "");
    return hashtagArr;
  };

  if (!mongoose.Types.ObjectId.isValid(profileId)) {
    res.status(400).json({ message: "Specified profile id is not valid" });
    return;
  }

  const newPic = {
    ...req.body,
    hashtags: getHashtags(req.body.hashtags),
    owner: profileId,
  };

  Pic.create(newPic)
    .then((newPic) => {
      Profile.findByIdAndUpdate(
        { _id: profileId },
        { $push: { pics: newPic._id } },
        { new: true }
      ).then((updatedProfile) => res.json(updatedProfile));
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json({ message: "Image not saved" });
    });
});

router.get("/pics/:profileId", isAuthenticated, (req, res, next) => {
  const { profileId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(profileId)) {
    res.status(400).json({ message: "Specified profile id is not valid" });
    return;
  }

  Pic.find({ owner: profileId }, { $sort: { createdAt: -1 } })
    .then((response) => res.json(response))
    .catch((err) => console.log(`error getting pics for this profile`, err));
});

module.exports = router;
