/**
 * Run with: npm run seed
 * Creates a default admin user if one doesn't already exist.
 * Reads ADMIN_EMAIL / ADMIN_PASSWORD / ADMIN_NAME from .env, with sensible fallbacks.
 */
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("../config/db");
const User = require("../models/User");

const run = async () => {
  await connectDB();

  const email = process.env.ADMIN_EMAIL || "admin@dsaiclub.com";
  const password = process.env.ADMIN_PASSWORD || "Admin@12345";
  const name = process.env.ADMIN_NAME || "DSAI Admin";

  const existing = await User.findOne({ email });
  if (existing) {
    console.log(`Admin already exists: ${email}`);
  } else {
    await User.create({ name, email, password, role: "admin" });
    console.log(`Admin created -> email: ${email} password: ${password}`);
    console.log("Change this password after first login.");
  }

  await mongoose.disconnect();
  process.exit(0);
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
