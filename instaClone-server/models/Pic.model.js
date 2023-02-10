const { Schema, model } = require("mongoose");

const picSchema = new Schema(
  {
    pic: {
      type: String,
      required: [true, 'A valid image is required.'],
      unique: true,
    },
    description: {
      type: String,
    },
    hashtags: {
      type: [String]
    },
    likes: {
      type: [Schema.Types.ObjectId ],
      ref: "Profile"
    },
    owner: {
        type: Schema.Types.ObjectId,
        ref: "Profile"
      }
  },
  {   
    timestamps: true
  }
);

module.exports = model("Pic", picSchema);