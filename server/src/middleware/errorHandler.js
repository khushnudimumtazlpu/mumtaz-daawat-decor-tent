export const errorHandler = (err, req, res, next) => {
  console.error(`Error: ${err.message}`);
  let statusCode = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  if (err.name === "ValidationError") { statusCode = 400; message = Object.values(err.errors).map((error) => error.message).join(". "); }
  if (err.name === "CastError") { statusCode = 400; message = `Invalid ${err.path}`; }
  if (err.code === 11000) { statusCode = 409; message = `${Object.keys(err.keyValue).join(", ")} already exists`; }
  if (statusCode >= 500 && process.env.NODE_ENV === "production") message = "Internal Server Error";
  res.status(statusCode).json({ success: false, message, ...(process.env.NODE_ENV === "development" && { stack: err.stack }) });
};
export const notFound = (req, res, next) => { const error = new Error(`Not Found - ${req.originalUrl}`); res.status(404); next(error); };
