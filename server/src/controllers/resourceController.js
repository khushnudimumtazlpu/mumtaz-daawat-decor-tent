const handle = (handler) => (req, res, next) => Promise.resolve(handler(req, res)).catch(next);
export const createResourceController = (resource) => ({
  list: handle(async (req, res) => { const data = await resource.list(req.query); res.json({ success: true, data }); }),
  getById: handle(async (req, res) => { const item = await resource.getById(req.params.id); res.json({ success: true, data: { item } }); }),
  create: handle(async (req, res) => { const item = await resource.create(req.body); res.status(201).json({ success: true, message: "Resource created", data: { item } }); }),
  update: handle(async (req, res) => { const item = await resource.update(req.params.id, req.body); res.json({ success: true, message: "Resource updated", data: { item } }); }),
  remove: handle(async (req, res) => { await resource.remove(req.params.id); res.status(204).send(); }),
});
