const { Schema, model } = require("mongoose");

const profileSchema = new Schema(
  {
    profileName: {
      type: String,
      required: [true, "A name for your profile is required."],
      unique: true,
      trim: true,
    },
    bio: {
      type: String,
      default: "📷",
    },
    avatar: {
      type: String,
      default:
        "https://res.cloudinary.com/daualsgyz/image/upload/v1676127087/insta-clone/w2hr20u8oasoc7xdmtfw.png",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    pics: {
      type: [Schema.Types.ObjectId],
      ref: "Pic",
    },
    followers: {
      type: [Schema.Types.ObjectId],
      ref: "Profile",
    },
    followed: {
      type: [Schema.Types.ObjectId],
      ref: "Profile",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Profile", profileSchema);
