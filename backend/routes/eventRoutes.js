const express = require("express");
const router = express.Router();
const {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
} = require("../controllers/eventController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly, executiveOnly} = require("../middleware/adminMiddleware");
const { uploadFields } = require("../middleware/uploadMiddleware");
const { validate } = require("../middleware/validationMiddleware");

const eventRules = [
  { field: "title", required: true, type: "string" },
  { field: "description", required: true, type: "string" },
  { field: "category", required: true, type: "string" },
  { field: "date", required: true, type: "date" },
];

const eventImageFields = uploadFields([
  { name: "coverImage", maxCount: 1 },
  { name: "photos", maxCount: 10 },
]);

router.get("/", getEvents);
router.get("/:id", getEvent);

router.post("/", protect,executiveOnly, eventImageFields, validate(eventRules), createEvent);
router.put("/:id", protect, executiveOnly, eventImageFields, updateEvent);
router.delete("/:id", protect, executiveOnly, deleteEvent);

module.exports = router;
