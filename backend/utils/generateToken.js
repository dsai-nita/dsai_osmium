const jwt = require("jsonwebtoken");

/**
 * Sign a JWT for a given user id.
 */
const signToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || "7d",
  });
};

/**
 * Sign a JWT and set it as an HTTP-only cookie on the response.
 */
const sendTokenCookie = (res, userId) => {
  const token = signToken(userId);
  const expiresDays = Number(process.env.COOKIE_EXPIRES_DAYS) || 7;

  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: expiresDays * 24 * 60 * 60 * 1000,
  });

  return token;
};

const clearTokenCookie = (res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    expires: new Date(0),
  });
};

module.exports = { signToken, sendTokenCookie, clearTokenCookie };
