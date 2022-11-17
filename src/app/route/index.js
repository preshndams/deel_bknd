import express from "express";

import middleware from "./middleware.js";
import routes from "./routes.js";
const app = express();

middleware(app);
routes(app);

app.use("/healthz", (req, res) => res.status(200).json({ message: "Active" }));

app.use((err, req, res, next) => {
  if (!err) return next();
  res
    .status(err.httpStatusCode || 500)
    .json({ error: err.name, message: err.message });
});

app.use((req, res) => {
  res.status(404).json({
    message: `Requested route (${req.originalUrl} ) not found`,
  });
});

export default app;
