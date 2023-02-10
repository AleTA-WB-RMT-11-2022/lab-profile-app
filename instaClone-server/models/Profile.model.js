const { Schema, model } = require("mongoose");

const profileSchema = new Schema(
  {
    profileName: {
      type: String,
      required: [true, 'A name for your profile is required.'],
      unique: true,
      trim: true
    },
    bio:{
      type: String,
    },
    avatar: {
      type: String,
      default: "../assets/def-profile.png",
    },
    owner: {
      type: Schema.Types.ObjectId ,
      ref: "User"
    },
    pics: {
      type: [Schema.Types.ObjectId ],
      ref: "Pic"
    },
    followers: {
        type: [Schema.Types.ObjectId ],
        ref: "Profile"
      },
    followed: {
        type: [Schema.Types.ObjectId ],
        ref: "Profile"
    }
  },
  {   
    timestamps: true
  }
);

module.exports = model("Profile", profileSchema);