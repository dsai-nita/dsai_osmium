const express = require("express");
const router = express.Router();
const {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly, executiveOnly } = require("../middleware/adminMiddleware");
const { uploadSingle } = require("../middleware/uploadMiddleware");
const { validate } = require("../middleware/validationMiddleware");

const projectRules = [
  { field: "title", required: true, type: "string" },
  { field: "year", required: true, type: "number" },
  { field: "description", required: true, type: "string" },
];

router.get("/", getProjects);
router.get("/:id", getProject);

router.post("/", protect, executiveOnly, uploadSingle("coverImage"), validate(projectRules), createProject);
router.put("/:id", protect, executiveOnly, uploadSingle("coverImage"), updateProject);
router.delete("/:id", protect, executiveOnly, deleteProject);

module.exports = router;
