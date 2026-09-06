const User = require("../models/User");
const { asyncHandler } = require("../utils/apiError");

// @desc    Get leaderboard, ranked by points descending
// @route   GET /api/users/leaderboard?limit=10
// @access  Public
const getLeaderboard = asyncHandler(async (req, res) => {
  const limit = Math.max(Number(req.query.limit) || 20, 1);

  const users = await User.find({ isActive: true })
    .sort({ points: -1 })
    .limit(limit)
    .select("name points profileImage branch");

  const leaderboard = users.map((user, index) => ({
    rank: index + 1,
    id: user._id,
    name: user.name,
    points: user.points,
    profileImage: user.profileImage,
    branch: user.branch,
  }));

  res.status(200).json({ success: true, data: leaderboard });
});

module.exports = { getLeaderboard };
