const router = require("express").Router();
const fileUploader = require("../config/cloudinary.config");
const { isAuthenticated } = require("../middleware/jwt.middleware.js");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

router.post("/upload", isAuthenticated, fileUploader.single("image"), (req, res, next) => {
  if (!req.file) {
    next(new Error("No file uploaded!"))
    return;
  }
  res.json({ image: req.file.path })
})

module.exports = router;
