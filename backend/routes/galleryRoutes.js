const express = require("express");
const router = express.Router();
const {
  getGalleryItems,
  getGalleryItem,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryPhotos,
  deleteGalleryItem,
} = require("../controllers/galleryController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly,executiveOnly } = require("../middleware/adminMiddleware");
const { uploadMultiple } = require("../middleware/uploadMiddleware");
const { validate } = require("../middleware/validationMiddleware");

const galleryRules = [
  { field: "title", required: true, type: "string" },
  {
    field: "category",
    required: true,
    enum: ["Events", "Workshops", "Projects", "Awards & Recognition"],
  },
  { field: "date", required: true, type: "date" },
];

router.get("/", getGalleryItems);
router.get("/:id", getGalleryItem);

router.post(
  "/",
  protect,
  executiveOnly,
  uploadMultiple("photos", 20),
  validate(galleryRules),
  createGalleryItem
);
router.put("/:id", protect, executiveOnly, uploadMultiple("photos", 20), updateGalleryItem);
router.delete("/:id/photos", protect, executiveOnly, deleteGalleryPhotos);
router.delete("/:id", protect, executiveOnly, deleteGalleryItem);

module.exports = router;
