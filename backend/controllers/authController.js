const User = require("../models/User");
const { ApiError, asyncHandler } = require("../utils/apiError");
const { sendTokenCookie, clearTokenCookie } = require("../utils/generateToken");
const {uploadToCloudinary, deleteFromCloudinary } = require("../utils/cloudinary");

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res) => {
  const { name, email, password, branch, year, github, linkedin ,role} = req.body;

  if (!name || !email || !password) {
    throw new ApiError(400, "Name, email and password are required");
  }
  if (password.length < 8) {
    throw new ApiError(400, "Password must be at least 8 characters");
  }

  const existingUser = await User.findOne({ email: email.toLowerCase() });
  if (existingUser) {
    throw new ApiError(409, "Email is already registered");
  }

  const user = await User.create({
    name,
    email,
    password,
    branch,
    year,
    github,
    linkedin,
    role,
    bio: req.body.bio || "", // Default to empty string if bio is not provided
  });

  sendTokenCookie(res, user._id);

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "Email and password are required");
  }

  const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }
  if (!user.isActive) {
    throw new ApiError(403, "Account is deactivated Contact support for assistance");
  }
  if (user.role!="user"&&!user.isVerified) {
    throw new ApiError(403, "Account is not verified Contact support for assistance");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new ApiError(401, "Invalid email or password");
  }

  sendTokenCookie(res, user._id);

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: user,
  });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Private
const logout = asyncHandler(async (req, res) => {
  clearTokenCookie(res);
  res.status(200).json({ success: true, message: "Logged out successfully" });
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json({ success: true, data: req.user });
});

// @desc    Update the current logged in user's profile
// @route   PATCH /api/auth/me
// @access  Private
const updateMe = asyncHandler(async (req, res) => {


  const user = await User.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const updates = {};

  
  const allowedFields = [
    "name",
    "branch",
    "year",
    "github",
    "linkedin",
    "bio",
    "phone",
  ];

  for (const field of allowedFields) {
    if (req.body?.[field] !== undefined) {
      updates[field] = req.body[field];
    }
  }

  if (req.file) {
   

    try {
     
      const uploadedImage = await uploadToCloudinary(
        req.file.buffer,
        "dsai/members"
      );

      console.log("Cloudinary upload successful:", uploadedImage);

      // Only delete old image after new upload succeeds
      if (user.profileImage?.publicId) {
        console.log("Deleting old image:", user.profileImage.publicId);

        try {
          await deleteFromCloudinary(user.profileImage.publicId);
        } catch (deleteError) {
          console.error("Old image delete failed:", deleteError);
          // Don't fail the complete profile update
        }
      }

      updates.profileImage = uploadedImage;
    } catch (uploadError) {
      console.error("Cloudinary upload error:", uploadError);

      throw new ApiError(
        500,
        "Failed to upload profile image"
      );
    }
  }

  // Update database
  const updatedUser = await User.findByIdAndUpdate(
    req.user._id,
    { $set: updates },
    {
      new: true,
      runValidators: true,
    }
  );

  if (!updatedUser) {
    throw new ApiError(404, "User not found");
  }

  console.log("Profile updated successfully");

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    data: updatedUser,
  });
});

module.exports = { register, login, logout, getMe, updateMe };
