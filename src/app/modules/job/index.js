import { Router } from "express";

import { inputValidator } from "../../utils/index.js";
import { guard } from "../../utils/middleware.js";

import * as controller from "./controller.js";
import validation from "./validation.js";

const route = Router();

route.get("/jobs", inputValidator(validation.listJob), controller.listJobs);

route.get("/jobs/:id", inputValidator(validation.view), controller.view);
route.post(
  "/jobs/:job_id/pay",
  inputValidator(validation.pay),
  guard,
  controller.pay
);

export default route;
