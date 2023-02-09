const { Schema, model } = require("mongoose");

const picSchema = new Schema(
  {
    pic: {
      type: String,
      required: [true, 'A valid image is required.'],
      unique: true,
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
    // this second object adds extra properties: `createdAt` and `updatedAt`    
    timestamps: true
  }
);

module.exports = model("Pic", picSchema);