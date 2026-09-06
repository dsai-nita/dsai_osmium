const express = require("express");
const router = express.Router();
const { register, login, logout, getMe, updateMe } = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");
const { validate } = require("../middleware/validationMiddleware");
const {uploadSingle}=require("../middleware/uploadMiddleware");  

const registerRules = [
  { field: "name", required: true, type: "string" },
  { field: "email", required: true, type: "email" },
  { field: "password", required: true, minLength: 8 },
];

const loginRules = [
  { field: "email", required: true, type: "email" },
  { field: "password", required: true },
];

router.post("/register", validate(registerRules), register);
router.post("/login", validate(loginRules), login);
router.post("/logout", protect, logout);
router.get("/me", protect, getMe);
router.patch("/me", protect, uploadSingle("image"), updateMe);

module.exports = router;
