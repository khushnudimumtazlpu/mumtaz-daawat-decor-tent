import Inquiry from "../models/Inquiry.js";
import { buildListQuery, paginationMeta } from "../utils/queryFeatures.js";

const notFound = () => Object.assign(new Error("Inquiry not found"), { statusCode: 404 });

export const create = async (payload) => Inquiry.create(payload);

export const listForUser = async (userId) => Inquiry.find({ userId }).sort({ createdAt: -1 });

export const removeForUser = async (id, userId) => {
  const inquiry = await Inquiry.findOneAndDelete({ _id: id, userId });
  if (!inquiry) throw notFound();
};

export const list = async (query) => {
  const { filter, page, limit, sort } = buildListQuery(query, {
    searchFields: ["name", "email", "phone", "message"],
    filterFields: { status: "string" },
    sortFields: ["createdAt", "status", "updatedAt"],
  });
  const records = Inquiry.find(filter).sort(sort).skip((page - 1) * limit).limit(limit);
  const [items, total] = await Promise.all([records, Inquiry.countDocuments(filter)]);
  return { items, pagination: paginationMeta({ total, page, limit }) };
};

export const reply = async (id, message) => {
  const inquiry = await Inquiry.findById(id);
  if (!inquiry) throw notFound();
  inquiry.responses.push({ message, delivery: process.env.EMAIL_FROM ? "sent" : "pending_configuration" });
  inquiry.status = "responded";
  await inquiry.save();
  return inquiry;
};

export const remove = async (id) => {
  const inquiry = await Inquiry.findByIdAndDelete(id);
  if (!inquiry) throw notFound();
};
