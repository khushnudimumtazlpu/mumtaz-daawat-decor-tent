import { deleteImage, uploadImage } from "../services/imageService.js";
export const upload = async (req, res, next) => { try { const image = await uploadImage(req.file); res.status(201).json({ success: true, message: "Image uploaded", data: { image } }); } catch (error) { next(error); } };
export const remove = async (req, res, next) => { try { await deleteImage(req.body?.publicId); res.status(204).send(); } catch (error) { next(error); } };
