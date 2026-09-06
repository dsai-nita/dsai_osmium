const express = require("express");
const router = express.Router();
const {
  getQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
} = require("../controllers/quizController");
const { protect } = require("../middleware/authMiddleware");
const { adminOnly ,executiveOnly} = require("../middleware/adminMiddleware");
const { validate } = require("../middleware/validationMiddleware");

const quizRules = [
  { field: "title", required: true, type: "string" },
  { field: "category", required: true, type: "string" },
];

// Public listing (optional auth so admins can pass ?all=true)
const optionalAuth = (req, res, next) => {
  if (req.cookies && req.cookies.token) {
    return protect(req, res, next);
  }
  next();
};

router.get("/", optionalAuth, getQuizzes);
router.get("/:id", getQuiz);

router.post("/", protect, executiveOnly, validate(quizRules), createQuiz);
router.put("/:id", protect, executiveOnly, updateQuiz);
router.delete("/:id", protect, executiveOnly, deleteQuiz);

router.post("/:id/submit", protect, submitQuiz);

module.exports = router;
