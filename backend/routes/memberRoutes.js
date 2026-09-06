const express = require("express");
const router = express.Router();
const {
  getMembers,
  getMember,
  createMember,
  updateMember,
  deleteMember,
} = require("../controllers/memberController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");
const { uploadSingle } = require("../middleware/uploadMiddleware");
const { validate } = require("../middleware/validationMiddleware");

const memberRules = [
  { field: "name", required: true, type: "string" },
  { field: "position", required: true, type: "string" },
  { field: "email", required: false, type: "email" },
];

router.get("/", getMembers);
router.get("/:id", getMember);

router.post("/", protect, uploadSingle("image"), createMember);
router.put("/:id", protect, uploadSingle("image"), updateMember);
router.delete("/:id", protect,adminOnly, deleteMember);

module.exports = router;
