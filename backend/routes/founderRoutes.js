const express = require("express");
const router = express.Router();
const {
  getFounders,
  getFounder,
  createFounder,
  updateFounder,
  deleteFounder,
} = require("../controllers/founderController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");
const { uploadSingle } = require("../middleware/uploadMiddleware");
const { validate } = require("../middleware/validationMiddleware");

const founderRules = [
  { field: "name", required: true, type: "string" },
  { field: "designation", required: true, type: "string" },
];

router.get("/", getFounders);
router.get("/:id", getFounder);

router.post("/", protect, adminOnly, uploadSingle("image"), validate(founderRules), createFounder);
router.put("/:id", protect, adminOnly, uploadSingle("image"), updateFounder);
router.delete("/:id", protect, adminOnly, deleteFounder);

module.exports = router;
