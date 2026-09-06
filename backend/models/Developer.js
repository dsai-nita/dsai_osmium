const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    role: { type: String, trim: true },
    designation: { type: String, trim: true },
    joinedAt: { type: String, trim: true }, // e.g. "2024-01"
    skills: { type: [String], default: [] },
    contributions: { type: [String], default: [] },
    github: { type: String, trim: true },
    linkedin: { type: String, trim: true },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please provide a valid email"],
    },
    type: { type: String, enum: ["core", "contributor"], default: "contributor" },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

developerSchema.index({ type: 1 });

module.exports = mongoose.model("Developer", developerSchema);
