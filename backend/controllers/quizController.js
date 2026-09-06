const Quiz = require("../models/Quiz");
const QuizAttempt = require("../models/QuizAttempt");
const User = require("../models/User");
const { ApiError, asyncHandler } = require("../utils/apiError");

// @desc    Get all quizzes (public sees only published; admin sees all with ?all=true)
// @route   GET /api/quizzes
// @access  Public
const getQuizzes = asyncHandler(async (req, res) => {
  const { category, difficulty, page = 1, limit = 100 } = req.query;
  const filter = {};

 const role = (req.user?.role || "")
  .toLowerCase()
  .replace(/[^a-z0-9]/g, "");

const isAdmin = role === "admin" || role === "president";
  if (!isAdmin || req.query.all !== "true") {
    filter.isPublished = true;
  }

  if (category) filter.category = category;
  if (difficulty) filter.difficulty = difficulty;

  const pageNum = Math.max(Number(page), 1);
  const limitNum = Math.max(Number(limit), 1);
  const skip = (pageNum - 1) * limitNum;

  const [quizzes, total] = await Promise.all([
    Quiz.find(filter)
      .select("-questions.correctAnswer") // never leak answers in list view
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum),
    Quiz.countDocuments(filter),
  ]);

  res.status(200).json({
    success: true,
    data: quizzes,
    pagination: { page: pageNum, limit: limitNum, total, totalPages: Math.ceil(total / limitNum) },
  });
});

// @desc    Get single quiz (questions without correct answers, for taking the quiz)
// @route   GET /api/quizzes/:id
// @access  Public
const getQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id).select("-questions.correctAnswer");
  if (!quiz) throw new ApiError(404, "Quiz not found");
  res.status(200).json({ success: true, data: quiz });
});

// @desc    Create quiz
// @route   POST /api/quizzes
// @access  Admin
const createQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.create({ ...req.body, createdBy: req.user._id });
  res.status(201).json({ success: true, message: "Quiz created successfully", data: quiz });
});

// @desc    Update quiz
// @route   PUT /api/quizzes/:id
// @access  Admin
const updateQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) throw new ApiError(404, "Quiz not found");

  Object.assign(quiz, req.body);
  await quiz.save({ runValidators: true });

  res.status(200).json({ success: true, message: "Quiz updated successfully", data: quiz });
});

// @desc    Delete quiz
// @route   DELETE /api/quizzes/:id
// @access  Admin
const deleteQuiz = asyncHandler(async (req, res) => {
  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) throw new ApiError(404, "Quiz not found");
  await quiz.deleteOne();
  res.status(200).json({ success: true, message: "Quiz deleted successfully" });
});

// @desc    Submit quiz answers, calculate score, update user points, save attempt
// @route   POST /api/quizzes/:id/submit
// @access  Private (User)
// Body: { answers: [{ questionId, selectedOption }], timeTaken }
const submitQuiz = asyncHandler(async (req, res) => {
  const { answers = [], timeTaken } = req.body;

  const quiz = await Quiz.findById(req.params.id);
  if (!quiz) throw new ApiError(404, "Quiz not found");
  if (!quiz.isPublished) throw new ApiError(400, "This quiz is not available");

  let score = 0;
  let correctAnswers = 0;

  const answerMap = new Map(answers.map((a) => [String(a.questionId), a.selectedOption]));

  quiz.questions.forEach((q) => {
    const selected = answerMap.get(String(q._id));
    if (selected !== undefined && Number(selected) === q.correctAnswer) {
      score += q.points;
      correctAnswers += 1;
    }
  });

  const attempt = await QuizAttempt.create({
    user: req.user._id,
    quiz: quiz._id,
    score,
    totalPoints: quiz.points,
    correctAnswers,
    totalQuestions: quiz.questions.length,
    timeTaken,
  });

  // Award points to the user's running total
  await User.findByIdAndUpdate(req.user._id, { $inc: { points: score } });

  res.status(201).json({
    success: true,
    message: "Quiz submitted successfully",
    data: {
      score,
      totalPoints: quiz.points,
      correctAnswers,
      totalQuestions: quiz.questions.length,
      attemptId: attempt._id,
    },
  });
});

module.exports = {
  getQuizzes,
  getQuiz,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  submitQuiz,
};
