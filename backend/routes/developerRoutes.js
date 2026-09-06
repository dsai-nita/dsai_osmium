const express = require("express");
const router = express.Router();
const {
  getDevelopers,
  getDeveloper,
  createDeveloper,
  updateDeveloper,
  deleteDeveloper,
} = require("../controllers/developerController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly } = require("../middleware/adminMiddleware");
const { uploadSingle } = require("../middleware/uploadMiddleware");
const { validate } = require("../middleware/validationMiddleware");

const developerRules = [{ field: "name", required: true, type: "string" }];

router.get("/", getDevelopers);
router.get("/:id", getDeveloper);

router.post("/", protect, adminOnly, uploadSingle("image"), createDeveloper);
router.put("/:id", protect, adminOnly, uploadSingle("image"), updateDeveloper);
router.delete("/:id", protect, adminOnly, deleteDeveloper);

module.exports = router;
