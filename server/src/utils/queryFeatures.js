const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const parseBoolean = (value, field) => { if (value === "true") return true; if (value === "false") return false; throw Object.assign(new Error(`${field} must be true or false`), { statusCode: 400 }); };
export const buildListQuery = (query, { baseFilter = {}, searchFields = [], filterFields = {}, sortFields = ["createdAt"] }) => {
  const filter = { ...baseFilter };
  for (const [field, type] of Object.entries(filterFields)) if (query[field] !== undefined) filter[field] = type === "boolean" ? parseBoolean(query[field], field) : query[field];
  if (query.search?.trim() && searchFields.length) { const expression = new RegExp(escapeRegex(query.search.trim()), "i"); filter.$or = searchFields.map((field) => ({ [field]: expression })); }
  const page = Math.max(Number.parseInt(query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(query.limit, 10) || 12, 1), 100);
  const sortBy = sortFields.includes(query.sortBy) ? query.sortBy : "createdAt";
  return { filter, page, limit, sort: { [sortBy]: query.sortOrder === "asc" ? 1 : -1 } };
};
export const paginationMeta = ({ total, page, limit }) => ({ total, page, limit, totalPages: Math.ceil(total / limit), hasNextPage: page * limit < total, hasPreviousPage: page > 1 });
