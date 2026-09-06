const Founder = require("../models/Founder");
const { ApiError, asyncHandler } = require("../utils/apiError");
const { uploadToCloudinary, deleteFromCloudinary } = require("../utils/cloudinary");

// @desc    Get all founders, sorted by display order
// @route   GET /api/founders
// @access  Public
const getFounders = asyncHandler(async (req, res) => {
  const founders = await Founder.find().sort({ order: 1 });
  res.status(200).json({ success: true, data: founders });
});

// @desc    Get single founder
// @route   GET /api/founders/:id
// @access  Public
const getFounder = asyncHandler(async (req, res) => {
  const founder = await Founder.findById(req.params.id);
  if (!founder) throw new ApiError(404, "Founder not found");
  res.status(200).json({ success: true, data: founder });
});

// @desc    Create founder
// @route   POST /api/founders
// @access  Admin
const createFounder = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (req.file) {
    body.image = await uploadToCloudinary(req.file.buffer, "dsai/founders");
  }
  const founder = await Founder.create(body);
  res.status(201).json({ success: true, message: "Founder created successfully", data: founder });
});

// @desc    Update founder
// @route   PUT /api/founders/:id
// @access  Admin
const updateFounder = asyncHandler(async (req, res) => {
  const founder = await Founder.findById(req.params.id);
  if (!founder) throw new ApiError(404, "Founder not found");

  Object.assign(founder, req.body);

  if (req.file) {
    if (founder.image && founder.image.publicId) {
      await deleteFromCloudinary(founder.image.publicId);
    }
    founder.image = await uploadToCloudinary(req.file.buffer, "dsai/founders");
  }

  await founder.save({ runValidators: true });
  res.status(200).json({ success: true, message: "Founder updated successfully", data: founder });
});

// @desc    Delete founder
// @route   DELETE /api/founders/:id
// @access  Admin
const deleteFounder = asyncHandler(async (req, res) => {
  const founder = await Founder.findById(req.params.id);
  if (!founder) throw new ApiError(404, "Founder not found");

  if (founder.image && founder.image.publicId) {
    await deleteFromCloudinary(founder.image.publicId);
  }

  await founder.deleteOne();
  res.status(200).json({ success: true, message: "Founder deleted successfully" });
});

module.exports = { getFounders, getFounder, createFounder, updateFounder, deleteFounder };
