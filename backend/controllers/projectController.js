const Project = require("../models/Project");
const { ApiError, asyncHandler } = require("../utils/apiError");
const { uploadToCloudinary, deleteFromCloudinary } = require("../utils/cloudinary");

// @desc    Get all projects (supports ?year=&tech=&category=&page=&limit=)
// @route   GET /api/projects
// @access  Public
const getProjects = asyncHandler(async (req, res) => {
  const { year, tech, category, page = 1, limit = 10 } = req.query;
  const filter = {};

  if (year) filter.year = Number(year);
  if (tech) filter.techStack = { $in: [tech] };
  if (category) filter.category = { $in: [category] };

  const pageNum = Math.max(Number(page), 1);
  const limitNum = Math.max(Number(limit), 1);
  const skip = (pageNum - 1) * limitNum;

  const [projects, total] = await Promise.all([
    Project.find(filter)
      .sort({ featured: -1, year: -1 })
      .skip(skip)
      .limit(limitNum)
      .populate("createdBy", "name email"),
    Project.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: projects,
    pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) },
  });
});

// @desc    Get single project
// @route   GET /api/projects/:id
// @access  Public
const getProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id).populate("createdBy", "name email");
  if (!project) throw new ApiError(404, "Project not found");
  res.status(200).json({ success: true, data: project });
});

// @desc    Create project
// @route   POST /api/projects
// @access  Admin
const createProject = asyncHandler(async (req, res) => {
  const body = { ...req.body, createdBy: req.user._id };

  if (req.file) {
    body.coverImage = await uploadToCloudinary(req.file.buffer, "dsai/projects");
  }

  const project = await Project.create(body);
  res.status(201).json({ success: true, message: "Project created successfully", data: project });
});

// @desc    Update project
// @route   PUT /api/projects/:id
// @access  Admin
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, "Project not found");

  Object.assign(project, req.body);

  if (req.file) {
    if (project.coverImage && project.coverImage.publicId) {
      await deleteFromCloudinary(project.coverImage.publicId);
    }
    project.coverImage = await uploadToCloudinary(req.file.buffer, "dsai/projects");
  }

  await project.save({ runValidators: true });
  res.status(200).json({ success: true, message: "Project updated successfully", data: project });
});

// @desc    Delete project
// @route   DELETE /api/projects/:id
// @access  Admin
const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);
  if (!project) throw new ApiError(404, "Project not found");

  if (project.coverImage && project.coverImage.publicId) {
    await deleteFromCloudinary(project.coverImage.publicId);
  }

  await project.deleteOne();
  res.status(200).json({ success: true, message: "Project deleted successfully" });
});

module.exports = { getProjects, getProject, createProject, updateProject, deleteProject };
