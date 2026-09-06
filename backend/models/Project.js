const mongoose = require("mongoose");

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    year: { type: Number, required: [true, "Year is required"] },
    description: { type: String, required: [true, "Description is required"] },
    coverImage: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    techStack: { type: [String], default: [] },
    category: { type: [String], default: [] },
    team: { type: [String], default: [] },
    github: { type: String, trim: true },
    demo: { type: String, trim: true },
    featured: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

projectSchema.index({ year: -1 });
projectSchema.index({ category: 1 });
projectSchema.index({ techStack: 1 });

module.exports = mongoose.model("Project", projectSchema);
