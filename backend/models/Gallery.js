const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
);

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    description: { type: String, trim: true },
    category: {
      type: String,
      required: [true, "Category is required"],
      enum: ["Events", "Workshops", "Projects", "Awards & Recognition"],
    },
    date: { type: Date, required: [true, "Date is required"] },
    photos: {
      type: [photoSchema],
      default: [],
      validate: {
        validator: (arr) => arr.length >= 0,
        message: "At least one photo is required",
      },
    },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

gallerySchema.index({ category: 1 });
gallerySchema.index({ date: -1 });

module.exports = mongoose.model("Gallery", gallerySchema);
