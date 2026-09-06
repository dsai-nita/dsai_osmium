// filepath: c:\Users\samir\OneDrive\Desktop\project\dsai\controllers\memberController.js
const mongoose = require("mongoose");
const User = require("../models/User");

const { ApiError, asyncHandler } = require("../utils/apiError");
const { uploadToCloudinary, deleteFromCloudinary } = require("../utils/cloudinary");

const getMemberId = (req) => {
  const { id } = req.params;

  if (!id || !mongoose.Types.ObjectId.isValid(id)) {
    throw new ApiError(400, "Invalid member id");
  }

  return id;
};

// @desc    Get all members (supports ?current=&branch=&page=&limit=)
// @route   GET /api/members
// @access  Public
const getMembers = asyncHandler(async (req, res) => {
  const { current, branch, page = 1 ,limit=100} = req.query;
  const filter = {};

  if (current !== undefined) filter.isCurrent = current === "true";
  if (branch) filter.branch = branch;

  const pageNum = Math.max(Number(page), 1);
  const limitNum = Math.max(Number(limit), 1);
  const skip = (pageNum - 1) * limitNum;

  const [Users, total] = await Promise.all([
    User.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limitNum),
    User.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: Users,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  });
});

// @desc    Get single member
// @route   GET /api/members/:id
// @access  Public
const getMember = asyncHandler(async (req, res) => {
  console.log("Fetching member with ID:", req.params.id); // Debugging line
  const memberId = req.params.id;

  const member = await User.findById(memberId);
  if (!member) throw new ApiError(404, "Member not found");

  res.status(200).json({ success: true, data: member });
});

// @desc    Create member
// @route   POST /api/members
// @access  Admin
const createMember = asyncHandler(async (req, res) => {
  const body = { ...req.body };

  if (req.file) {
    body.image = await uploadToCloudinary(req.file.buffer, "dsai/members");
  }
  console.log("Request body for create:", body); // Debugging line

  const member = await User.create(body);
  res.status(201).json({ success: true, message: "Member created successfully", data: member });
});


const updateMember = asyncHandler(async (req, res) => {
  const memberId = getMemberId(req);
  console.log("Request body for update:", req.body); // Debugging line
  console.log("Updating member with ID:", memberId); // Debugging line
  
  const member = await User.findById(memberId);
  if (!member) throw new ApiError(404, "Member not found");

  Object.assign(member, req.body);

  if (req.file) {
    if (member.image && member.image.publicId) {
      await deleteFromCloudinary(member.image.publicId);
    }
    member.image = await uploadToCloudinary(req.file.buffer, "dsai/members");
  }

  await member.save({ runValidators: true });

  res.status(200).json({
    success: true,
    message: "Member updated successfully",
    data: member,
  });
});

// @desc    Delete member
// @route   DELETE /api/members/:id
// @access  Admin
const deleteMember = asyncHandler(async (req, res) => {
  const memberId = getMemberId(req);

  const member = await User.findById(memberId);
  if (!member) throw new ApiError(404, "Member not found");

  if (member.image && member.image.publicId) {
    await deleteFromCloudinary(member.image.publicId);
  }

  await member.deleteOne();

  res.status(200).json({ success: true, message: "Member deleted successfully" });
});

module.exports = { getMembers, getMember, createMember, updateMember, deleteMember };