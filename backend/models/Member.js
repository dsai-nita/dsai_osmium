const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    role: { type: String, required: [true, "Role is required"], trim: true },
    branch: { type: String, trim: true },
    year: { type: Number },
    bio: { type: String, trim: true },
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    github: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    isCurrent: { type: Boolean, default: true },
  },
  { timestamps: true }
);

memberSchema.index({ isCurrent: 1 });
memberSchema.index({ branch: 1 });

module.exports = mongoose.model("Member", memberSchema);
