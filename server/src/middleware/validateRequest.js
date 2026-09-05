import mongoose from "mongoose";

export const validateObjectId = (parameter = "id") => (req, res, next) => {
  if (!mongoose.isValidObjectId(req.params[parameter])) return res.status(400).json({ success: false, message: `Invalid ${parameter}` });
  next();
};

export const validateBody = ({ allowedFields, requiredFields = [], objectArrayFields = [] }) => (req, res, next) => {
  if (!req.body || Array.isArray(req.body) || typeof req.body !== "object") return res.status(400).json({ success: false, message: "Request body must be a JSON object" });
  const unknownFields = Object.keys(req.body).filter((field) => !allowedFields.includes(field));
  if (unknownFields.length) return res.status(400).json({ success: false, message: `Unsupported field(s): ${unknownFields.join(", ")}` });
  const missingFields = requiredFields.filter((field) => req.body[field] === undefined || req.body[field] === null || req.body[field] === "");
  if (missingFields.length) return res.status(400).json({ success: false, message: `Required field(s): ${missingFields.join(", ")}` });
  for (const [field, value] of Object.entries(req.body)) {
    if (typeof value === "string") req.body[field] = value.trim();
    if (Array.isArray(value) && objectArrayFields.includes(field)) {
      if (value.some((item) => !item || typeof item !== "object" || Array.isArray(item))) return res.status(400).json({ success: false, message: `${field} must contain valid objects` });
      continue;
    }
    if (Array.isArray(value) && value.some((item) => typeof item !== "string")) return res.status(400).json({ success: false, message: `${field} must contain only strings` });
    if (Array.isArray(value)) req.body[field] = value.map((item) => item.trim()).filter(Boolean);
  }
  next();
};
