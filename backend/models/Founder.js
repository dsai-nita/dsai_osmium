const mongoose = require("mongoose");

const founderSchema = new mongoose.Schema(
  {
    name: { type: String, required: [true, "Name is required"], trim: true },
    image: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    designation: { type: String, required: [true, "Designation is required"], trim: true },
    branch: { type: String, trim: true },
    batch: { type: String, trim: true },
    bio: { type: String, trim: true },
    specialties: { type: [String], default: [] },
    achievements: { type: [String], default: [] },
    socialLinks: {
      github: { type: String, trim: true },
      linkedin: { type: String, trim: true },
      twitter: { type: String, trim: true },
      instagram: { type: String, trim: true },
      website: { type: String, trim: true },
    },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

founderSchema.index({ order: 1 });

module.exports = mongoose.model("Founder", founderSchema);
