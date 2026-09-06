const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  { _id: false }
);

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    description: { type: String, required: [true, "Description is required"] },
    category: { type: String, required: [true, "Category is required"], trim: true },
    date: { type: Date, required: [true, "Date is required"] },
    startTime: { type: String },
    endTime: { type: String },
    speaker: { type: String, trim: true },
    venue: { type: String, trim: true },
    department: { type: String, trim: true },
    roomNo: { type: String, trim: true },
    organizer: { type: String, trim: true, default: "DSAI Club" },
    coverImage: {
      url: { type: String, default: "" },
      publicId: { type: String, default: "" },
    },
    photos: { type: [photoSchema], default: [] },
    registrationRequired: { type: Boolean, default: false },
    registrationLink: { type: String, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

eventSchema.index({ date: -1 });
eventSchema.index({ category: 1 });

module.exports = mongoose.model("Event", eventSchema);
