const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");

dotenv.config({ path: ".env.example" }); 

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

console.log(
  "Cloudinary configured:",
  Boolean(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  )
);
/**
 * Upload a single file buffer to Cloudinary.
 * @param {Buffer} fileBuffer
 * @param {string} folder - e.g. "dsai/events"
 * @returns {Promise<{url: string, publicId: string}>}
 */
const uploadToCloudinary = (fileBuffer, folder = "dsai/misc") => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "image" },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(fileBuffer);
  });
};

/**
 * Upload multiple file buffers to Cloudinary in parallel.
 * @param {Array<Buffer>} files
 * @param {string} folder
 */
const uploadMultipleToCloudinary = async (files, folder = "dsai/misc") => {
  const uploads = files.map((file) => uploadToCloudinary(file.buffer, folder));
  return Promise.all(uploads);
};

/**
 * Delete an image from Cloudinary by its publicId.
 */
const deleteFromCloudinary = async (publicId) => {
  if (!publicId) return;
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary delete error:", error.message);
  }
};

const deleteMultipleFromCloudinary = async (publicIds = []) => {
  return Promise.all(publicIds.map((id) => deleteFromCloudinary(id)));
};

module.exports = {
  cloudinary,
  uploadToCloudinary,
  uploadMultipleToCloudinary,
  deleteFromCloudinary,
  deleteMultipleFromCloudinary,
};
