import cors from 'cors'
import { json, urlencoded } from "express";

export default (app) => {
  app.use(cors());
  app.use(json());
  app.use(urlencoded({ extended: true }));

  if (process.env.NODE_ENV !== "production") {
    app.use((req, res, next) => {
      console.log("=========================================");
      console.log({
        token: req.headers.authorization,
        method: req.method,
        url: `${req.get("HOST")}${req.originalUrl}`,
        body: req.body,
        params: req.params,
        query: req.query,
      });
      console.log("=========================================");
      next();
    });
  }
};
