import multer from "multer";

const allowedMimeTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
export const imageUpload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 5 * 1024 * 1024, files: 1 }, fileFilter: (req, file, callback) => callback(null, allowedMimeTypes.has(file.mimetype)) }).single("image");
