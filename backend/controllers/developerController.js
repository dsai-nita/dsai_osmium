const Developer = require("../models/Developer");
const { ApiError, asyncHandler } = require("../utils/apiError");
const { uploadToCloudinary, deleteFromCloudinary } = require("../utils/cloudinary");

// @desc    Get all developers (supports ?type=core|contributor)
// @route   GET /api/developers
// @access  Public
const getDevelopers = asyncHandler(async (req, res) => {
  const { type, page = 1, limit = 20 } = req.query;
  const filter = { isActive: true };
  if (type) filter.type = type;

  const pageNum = Math.max(Number(page), 1);
  const limitNum = Math.max(Number(limit), 1);
  const skip = (pageNum - 1) * limitNum;

  const [developers, total] = await Promise.all([
    Developer.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    Developer.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: developers,
    pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) },
  });
});

// @desc    Get single developer
// @route   GET /api/developers/:id
// @access  Public
const getDeveloper = asyncHandler(async (req, res) => {
  const developer = await Developer.findById(req.params.id);
  if (!developer) throw new ApiError(404, "Developer not found");
  res.status(200).json({ success: true, data: developer });
});

// @desc    Create developer
// @route   POST /api/developers
// @access  Admin
const createDeveloper = asyncHandler(async (req, res) => {
  const body = { ...req.body };
  if (req.file) {
    body.image = await uploadToCloudinary(req.file.buffer, "dsai/developers");
  }
  const developer = await Developer.create(body);
  res.status(201).json({ success: true, message: "Developer created successfully", data: developer });
});

// @desc    Update developer
// @route   PUT /api/developers/:id
// @access  Admin
const updateDeveloper = asyncHandler(async (req, res) => {
  const developer = await Developer.findById(req.params.id);
  if (!developer) throw new ApiError(404, "Developer not found");

  Object.assign(developer, req.body);

  if (req.file) {
    if (developer.image && developer.image.publicId) {
      await deleteFromCloudinary(developer.image.publicId);
    }
    developer.image = await uploadToCloudinary(req.file.buffer, "dsai/developers");
  }

  await developer.save({ runValidators: true });
  res.status(200).json({ success: true, message: "Developer updated successfully", data: developer });
});

// @desc    Delete developer
// @route   DELETE /api/developers/:id
// @access  Admin
const deleteDeveloper = asyncHandler(async (req, res) => {
  const developer = await Developer.findById(req.params.id);
  if (!developer) throw new ApiError(404, "Developer not found");

  if (developer.image && developer.image.publicId) {
    await deleteFromCloudinary(developer.image.publicId);
  }

  await developer.deleteOne();
  res.status(200).json({ success: true, message: "Developer deleted successfully" });
});

module.exports = { getDevelopers, getDeveloper, createDeveloper, updateDeveloper, deleteDeveloper };
