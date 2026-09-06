const { ApiError } = require("../utils/apiError");

/**
 * Must run after `protect`. Restricts route access to req.user.role === "admin".
 */
const adminOnly = (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(401, "Not authorized"));
  }
  console.log("User role:", req.user.role); // Debugging line
  if (req.user.role.trim().toLowerCase() !== "admin"&&req.user.role !== "president") {
    return next(new ApiError(403, "Forbidden: admin or president access required"));
  }
  next();
};










const executiveRoles = ["president", "generalsecretary", "assistantgeneralsecretary","admin" ];

const executiveOnly = (req, res, next) => {
  if (!req.user) {
    return next(new ApiError(401, "Not authorized"));
  }

 const role = (req.user.role || "")
  .toLowerCase()
  .replace(/[^a-z0-9]/g, "");
  console.log("User role:", role); // Debugging line

  if (!executiveRoles.includes(role)) {
    return next(
      new ApiError(
        403,
        "Forbidden: executive access required"
      )
    );
  }

  next();
};

module.exports = { adminOnly, executiveOnly };
