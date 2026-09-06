const mongoose = require("mongoose");

const quizAttemptSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    quiz: { type: mongoose.Schema.Types.ObjectId, ref: "Quiz", required: true },
    score: { type: Number, required: true },
    totalPoints: { type: Number, required: true },
    correctAnswers: { type: Number, required: true },
    totalQuestions: { type: Number, required: true },
    timeTaken: { type: Number }, // seconds
    submittedAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

// One user can attempt a given quiz multiple times, but we index for fast leaderboard/history lookups
quizAttemptSchema.index({ user: 1, quiz: 1 });
quizAttemptSchema.index({ score: -1 });

module.exports = mongoose.model("QuizAttempt", quizAttemptSchema);
