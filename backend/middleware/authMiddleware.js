const jwt = require("jsonwebtoken");
const User = require("../models/User");
const { ApiError, asyncHandler } = require("../utils/apiError");

/**
 * Verifies the JWT (from cookie or Authorization header), loads the user,
 * and attaches it to req.user for downstream handlers.
 */
const protect = asyncHandler(async (req, res, next) => {

   console.log("========== AUTH DEBUG ==========");
  console.log("Origin:", req.headers.origin);
  console.log("Cookies:", req.cookies);
  console.log("Authorization:", req.headers.authorization);
  console.log("================================");
  let token;

  if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  } else if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    throw new ApiError(401, "Not authorized, no token provided",req.cookies);
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    throw new ApiError(401, "Not authorized, token invalid or expired");
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new ApiError(401, "Not authorized, user no longer exists");
  }
  if (!user.isActive) {
    throw new ApiError(403, "Account is deactivated");
  }

  req.user = user;
  next();
});

module.exports = { protect };
