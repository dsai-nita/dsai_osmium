const Event = require("../models/Event");
const { ApiError, asyncHandler } = require("../utils/apiError");
const {
  uploadToCloudinary,
  uploadMultipleToCloudinary,
  deleteFromCloudinary,
  deleteMultipleFromCloudinary,
} = require("../utils/cloudinary");

// @desc    Get all events (supports ?category=&year=&page=&limit=)
// @route   GET /api/events
// @access  Public
const getEvents = asyncHandler(async (req, res) => {
  const { category, year, page = 1, limit = 10 } = req.query;
  const filter = {};

  if (category) filter.category = category;
  if (year) {
    filter.date = {
      $gte: new Date(`${year}-01-01`),
      $lte: new Date(`${year}-12-31`),
    };
  }

  const pageNum = Math.max(Number(page), 1);
  const limitNum = Math.max(Number(limit), 1);
  const skip = (pageNum - 1) * limitNum;

  const [events, total] = await Promise.all([
    Event.find(filter).sort({ date: -1 }).skip(skip).limit(limitNum).populate("createdBy", "name email"),
    Event.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: events,
    pagination: {
      page: pageNum,
      limit: limitNum,
      total,
      totalPages: Math.ceil(total / limitNum),
    },
  });
});

// @desc    Get single event
// @route   GET /api/events/:id
// @access  Public
const getEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id).populate("createdBy", "name email");
  if (!event) throw new ApiError(404, "Event not found");
  res.status(200).json({ success: true, data: event });
});

// @desc    Create event (multipart/form-data: coverImage, photos[])
// @route   POST /api/events
// @access  Admin
const createEvent = asyncHandler(async (req, res) => {
  const body = { ...req.body, createdBy: req.user._id };

  if (req.files && req.files.coverImage && req.files.coverImage[0]) {
    const uploaded = await uploadToCloudinary(req.files.coverImage[0].buffer, "dsai/events");
    body.coverImage = uploaded;
  }

  if (req.files && req.files.photos && req.files.photos.length > 0) {
    body.photos = await uploadMultipleToCloudinary(req.files.photos, "dsai/events");
  }

  const event = await Event.create(body);
  res.status(201).json({ success: true, message: "Event created successfully", data: event });
});

// @desc    Update event
// @route   PUT /api/events/:id
// @access  Admin
const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) throw new ApiError(404, "Event not found");
  // Only copy fields the event API is allowed to update. This prevents
  // multipart form fields from overwriting nested image metadata.
  console.log("Request body:", req.files);
  const editableFields = [
    "title",
    "description",
    "category",
    "date",
    "startTime",
    "endTime",
    "speaker",
    "venue",
    "department",
    "roomNo",
    "organizer",
    "registrationLink",
  ];

  for (const field of editableFields) {
    if (req.body[field] !== undefined) event[field] = req.body[field];
  }
  if (req.body.registrationRequired !== undefined) {
    event.registrationRequired =
      req.body.registrationRequired === true || req.body.registrationRequired === "true";
  }

  if (req.files && req.files.coverImage && req.files.coverImage[0]) {
    const oldPublicId = event.coverImage?.publicId;
    try {
      // Keep the current image if the replacement fails to upload.
      console.log("Uploading new cover image to Cloudinary...");
      event.coverImage = await uploadToCloudinary(
        req.files.coverImage[0].buffer,
        "dsai/events"
      );
    } catch (error) {
      console.error("Event cover image upload failed:", error.message);
      throw new ApiError(502, "Could not upload the event cover image");
    }
    if (oldPublicId) await deleteFromCloudinary(oldPublicId);
  }

  if (req.files && req.files.photos && req.files.photos.length > 0) {
    const uploaded = await uploadMultipleToCloudinary(req.files.photos, "dsai/events");
    const existingPhotos = Array.isArray(event.photos) ? event.photos : [];
    event.photos = [...existingPhotos, ...uploaded];
  }

  await event.save({ runValidators: true });
  res.status(200).json({ success: true, message: "Event updated successfully", data: event });
});



// @desc    Delete event
// @route   DELETE /api/events/:id
// @access  Admin
const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);
  if (!event) throw new ApiError(404, "Event not found");

  if (event.coverImage && event.coverImage.publicId) {
    await deleteFromCloudinary(event.coverImage.publicId);
  }
  if (event.photos && event.photos.length > 0) {
    await deleteMultipleFromCloudinary(event.photos.map((p) => p.publicId));
  }

  await event.deleteOne();
  res.status(200).json({ success: true, message: "Event deleted successfully" });
});

module.exports = { getEvents, getEvent, createEvent, updateEvent, deleteEvent };
