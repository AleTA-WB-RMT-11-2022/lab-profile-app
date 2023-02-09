const { Schema, model } = require("mongoose");

const profileSchema = new Schema(
  {
    profileName: {
      type: String,
      required: [true, 'A name for your profile is required.'],
      unique: true,
      trim: true
    },
    pics: {
      type: [Schema.Types.ObjectId ],
      ref: "Pic"
    },
    followers: {
        type: [Schema.Types.ObjectId ],
        ref: "Profile"
      }
  },
  {
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

module.exports = model("Profile", profileSchema);