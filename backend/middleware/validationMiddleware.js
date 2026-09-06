/**
 * Lightweight, dependency-free body validator.
 *
 * Usage:
 *   router.post("/", validate(eventRules), controller.create)
 *
 * Rule shape per field:
 *   {
 *     field: "title",
 *     required: true,
 *     type: "string" | "number" | "boolean" | "array" | "email" | "date",
 *     enum: ["A", "B"],
 *     min: 0,
 *     max: 100,
 *   }
 */
const validate = (rules) => (req, res, next) => {
  const errors = [];

  for (const rule of rules) {
    const value = req.body[rule.field];
    const isEmpty =
      value === undefined || value === null || (typeof value === "string" && value.trim() === "");

    if (rule.required && isEmpty) {
      errors.push({ field: rule.field, message: `${rule.field} is required` });
      continue;
    }

    if (isEmpty) continue; // optional & not provided, skip further checks

    switch (rule.type) {
      case "email":
        if (!/^\S+@\S+\.\S+$/.test(value)) {
          errors.push({ field: rule.field, message: `${rule.field} must be a valid email` });
        }
        break;
      case "number":
        if (isNaN(Number(value))) {
          errors.push({ field: rule.field, message: `${rule.field} must be a number` });
        } else {
          if (rule.min !== undefined && Number(value) < rule.min) {
            errors.push({ field: rule.field, message: `${rule.field} must be >= ${rule.min}` });
          }
          if (rule.max !== undefined && Number(value) > rule.max) {
            errors.push({ field: rule.field, message: `${rule.field} must be <= ${rule.max}` });
          }
        }
        break;
      case "boolean":
        if (typeof value !== "boolean" && value !== "true" && value !== "false") {
          errors.push({ field: rule.field, message: `${rule.field} must be a boolean` });
        }
        break;
      case "array":
        if (!Array.isArray(value)) {
          errors.push({ field: rule.field, message: `${rule.field} must be an array` });
        }
        break;
      case "date":
        if (isNaN(Date.parse(value))) {
          errors.push({ field: rule.field, message: `${rule.field} must be a valid date` });
        }
        break;
      default:
        break;
    }

    if (rule.enum && !rule.enum.includes(value)) {
      errors.push({
        field: rule.field,
        message: `${rule.field} must be one of: ${rule.enum.join(", ")}`,
      });
    }

    if (rule.minLength !== undefined && typeof value === "string" && value.length < rule.minLength) {
      errors.push({
        field: rule.field,
        message: `${rule.field} must be at least ${rule.minLength} characters`,
      });
    }
  }

  if (errors.length > 0) {
    return res.status(422).json({
      success: false,
      message: "Validation failed",
      errors,
    });
  }

  next();
};

module.exports = { validate };
