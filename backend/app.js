const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const { notFound, errorHandler } = require("./middleware/errorMiddleware");

const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const projectRoutes = require("./routes/projectRoutes");
const memberRoutes = require("./routes/memberRoutes");
const quizRoutes = require("./routes/quizRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const developerRoutes = require("./routes/developerRoutes");
const founderRoutes = require("./routes/founderRoutes");
const userRoutes = require("./routes/userRoutes");


const app = express();


app.use(
  cors({
    origin: process.env.CLIENT_URL ,
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

if (process.env.NODE_ENV !== "production") {
  app.use(morgan("dev"));
}

// Basic rate limiting to slow down brute-force / abuse
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 300,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use("/api", apiLimiter);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ success: true, message: "DSAI Club API is running" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/quizzes", quizRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/developers", developerRoutes);
app.use("/api/founders", founderRoutes);
app.use("/api/users", userRoutes);// 404 + centralized error handling (must be last)
app.use(notFound);
app.use(errorHandler);

module.exports = app;
