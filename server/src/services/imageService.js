import { Readable } from "stream";
import cloudinary from "../config/cloudinary.js";

const ensureCloudinaryConfig = () => { if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) throw Object.assign(new Error("Cloudinary is not configured"), { statusCode: 503 }); };
export const uploadImage = async (file) => {
  if (!file) throw Object.assign(new Error("Please provide an image file"), { statusCode: 400 });
  ensureCloudinaryConfig();
  return new Promise((resolve, reject) => { const stream = cloudinary.uploader.upload_stream({ folder: "tenthouse/gallery", resource_type: "image", transformation: [{ quality: "auto", fetch_format: "auto" }] }, (error, result) => error ? reject(error) : resolve({ url: result.secure_url, publicId: result.public_id, width: result.width, height: result.height, format: result.format, bytes: result.bytes })); Readable.from(file.buffer).pipe(stream); });
};
export const deleteImage = async (publicId) => { if (!publicId) return; ensureCloudinaryConfig(); await cloudinary.uploader.destroy(publicId, { resource_type: "image", invalidate: true }); };
