const Gallery = require("../models/Gallery");
const { ApiError, asyncHandler } = require("../utils/apiError");
const { uploadMultipleToCloudinary, deleteMultipleFromCloudinary } = require("../utils/cloudinary");

// @desc    Get all gallery items (supports ?category=&page=&limit=)
// @route   GET /api/gallery
// @access  Public
const getGalleryItems = asyncHandler(async (req, res) => {
  const { category, page = 1, limit = 10 } = req.query;
  const filter = {};
  if (category) filter.category = category;

  const pageNum = Math.max(Number(page), 1);
  const limitNum = Math.max(Number(limit), 1);
  const skip = (pageNum - 1) * limitNum;

  const [items, total] = await Promise.all([
    Gallery.find(filter).sort({ date: -1 }).skip(skip).limit(limitNum).populate("createdBy", "name"),
    Gallery.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: items,
    pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) },
  });
});

// @desc    Get single gallery item
// @route   GET /api/gallery/:id
// @access  Public
const getGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findById(req.params.id).populate("createdBy", "name");
  if (!item) throw new ApiError(404, "Gallery item not found");
  res.status(200).json({ success: true, data: item });
});

// @desc    Create gallery item (multipart/form-data: photos[])
// @route   POST /api/gallery
// @access  Admin
const createGalleryItem = asyncHandler(async (req, res) => {
  const photos = req.files?.length
    ? await uploadMultipleToCloudinary(req.files, "dsai/gallery")
    : [];

  const item = await Gallery.create({
    ...req.body,
    photos,
    createdBy: req.user._id,
  });

  res.status(201).json({ success: true, message: "Gallery item created successfully", data: item });
});

// @desc    Delete selected photos from a gallery item
// @route   DELETE /api/gallery/:id/photos
// @access  Admin
const deleteGalleryPhotos = asyncHandler(async (req, res) => {
  const item = await Gallery.findById(req.params.id);
  if (!item) throw new ApiError(404, "Gallery item not found");

  const photoPublicIds = Array.isArray(req.body.photoPublicIds)
    ? req.body.photoPublicIds.filter(Boolean)
    : [];
  if (!photoPublicIds.length) {
    throw new ApiError(400, "Select at least one photo to delete");
  }

  const selected = item.photos.filter((photo) => photoPublicIds.includes(photo.publicId));
  if (!selected.length) throw new ApiError(404, "Selected photos were not found");

  await deleteMultipleFromCloudinary(selected.map((photo) => photo.publicId));
  item.photos = item.photos.filter((photo) => !photoPublicIds.includes(photo.publicId));
  await item.save({ runValidators: true });

  res.status(200).json({
    success: true,
    message: "Selected photos deleted successfully",
    data: item,
  });
});

// @desc    Update gallery item (new photos are appended)
// @route   PUT /api/gallery/:id
// @access  Admin
const updateGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findById(req.params.id);
  if (!item) throw new ApiError(404, "Gallery item not found");

  Object.assign(item, req.body);

  if (req.files && req.files.length > 0) {
    const newPhotos = await uploadMultipleToCloudinary(req.files, "dsai/gallery");
    const existingPhotos = Array.isArray(item.photos) ? item.photos : [];
    item.photos = [...existingPhotos, ...newPhotos];
  }

  await item.save({ runValidators: true });
  res.status(200).json({ success: true, message: "Gallery item updated successfully", data: item });
});

// @desc    Delete gallery item
// @route   DELETE /api/gallery/:id
// @access  Admin
const deleteGalleryItem = asyncHandler(async (req, res) => {
  const item = await Gallery.findById(req.params.id);
  if (!item) throw new ApiError(404, "Gallery item not found");

  if (item.photos && item.photos.length > 0) {
    await deleteMultipleFromCloudinary(item.photos.map((p) => p.publicId));
  }

  await item.deleteOne();
  res.status(200).json({ success: true, message: "Gallery item deleted successfully" });
});

module.exports = {
  getGalleryItems,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryPhotos,
  deleteGalleryItem,
};
