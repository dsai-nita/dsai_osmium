const multer = require("multer");
const { ApiError } = require("../utils/apiError");

// Store files in memory as buffers; we stream them to Cloudinary ourselves
const storage = multer.memoryStorage();

const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/jpg", "image/gif"];

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new ApiError(400, "Only image files (jpg, jpeg, png, webp, gif) are allowed"), false);
  }
};

const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
    files: 15, // safety cap on multi-upload fields
  },
});

// Single image field, e.g. "image" or "coverImage"
const uploadSingle = (fieldName) => upload.single(fieldName);

// Multiple images under one field, e.g. "photos"
const uploadMultiple = (fieldName, maxCount = 10) => upload.array(fieldName, maxCount);

// Mixed fields, e.g. coverImage (1) + photos (many) on the same request
const uploadFields = (fields) => upload.fields(fields);

module.exports = { upload, uploadSingle, uploadMultiple, uploadFields };
