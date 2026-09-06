require("dotenv").config();

const app = require("./app");
const connectDB = require("./config/db");

let dbPromise;

const handler = async (req, res) => {
  try {
    if (!dbPromise) {
      dbPromise = connectDB();
    }

    await dbPromise;

    return app(req, res);
  } catch (error) {
    console.error("Database connection error:", error);

    return res.status(500).json({
      success: false,
      message: "Database connection failed",
      error: error.message,
    });
  }
};

module.exports = handler;
