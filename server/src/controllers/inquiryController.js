import * as inquiryService from "../services/inquiryService.js";

const handle = (handler) => (req, res, next) => Promise.resolve(handler(req, res)).catch(next);

export const create = handle(async (req, res) => {
  const item = await inquiryService.create({ ...req.body, userId: req.user?.role === "user" ? req.user.userId : null });
  res.status(201).json({ success: true, message: "Your enquiry has been sent", data: { item } });
});
export const list = handle(async (req, res) => res.json({ success: true, data: await inquiryService.list(req.query) }));
export const listMine = handle(async (req, res) => res.json({ success: true, data: { items: await inquiryService.listForUser(req.user.userId) } }));
export const reply = handle(async (req, res) => {
  const item = await inquiryService.reply(req.params.id, req.body.message);
  const latest = item.responses.at(-1);
  res.json({ success: true, message: latest.delivery === "sent" ? "Response sent" : "Response saved; email delivery needs configuration", data: { item, delivery: latest.delivery } });
});
export const remove = handle(async (req, res) => { await inquiryService.remove(req.params.id); res.status(204).send(); });
export const removeMine = handle(async (req, res) => { await inquiryService.removeForUser(req.params.id, req.user.userId); res.status(204).send(); });
