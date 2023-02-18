const { Schema, model } = require("mongoose");

const picSchema = new Schema(
  {
    pic: {
      type: String,
      required: [true, "A valid image is required."],
    },
    description: {
      type: String,
      default: '🖼',
    },
    hashtags: {
      type: [String],
      default: ['🖼'],
    },
    likes: {
      type: [Schema.Types.ObjectId],
      ref: "Profile",
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "Profile",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Pic", picSchema);
