const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema(
  {
    question: { type: String, required: [true, "Question text is required"] },
    options: {
      type: [String],
      required: true,
      validate: {
        validator: (arr) => arr.length >= 2,
        message: "A question needs at least 2 options",
      },
    },
    correctAnswer: {
      type: Number,
      required: [true, "correctAnswer index is required"],
    },
    points: { type: Number, default: 10, min: 0 },
  },
  { _id: true }
);

// Ensure correctAnswer is a valid index into options
questionSchema.pre("validate", function (next) {
  if (
    this.correctAnswer !== undefined &&
    (this.correctAnswer < 0 || this.correctAnswer >= this.options.length)
  ) {
    return next(new Error("correctAnswer must be a valid index into options"));
  }
  next();
});

const quizSchema = new mongoose.Schema(
  {
    title: { type: String, required: [true, "Title is required"], trim: true },
    category: { type: String, required: [true, "Category is required"], trim: true },
    description: { type: String, trim: true },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      default: "Easy",
    },
    timeLimit: { type: Number, default: 15 }, // minutes
    points: { type: Number, default: 0 }, // total, auto-computed if not provided
    questions: { type: [questionSchema], default: [] },
    isPublished: { type: Boolean, default: false },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

// Keep `points` in sync with the sum of question points whenever questions change
quizSchema.pre("save", function (next) {
  if (this.isModified("questions")) {
    this.points = this.questions.reduce((sum, q) => sum + (q.points || 0), 0);
  }
  next();
});

quizSchema.index({ category: 1 });
quizSchema.index({ isPublished: 1 });

module.exports = mongoose.model("Quiz", quizSchema);
