import { Router } from "express";
import { inputValidator } from "../../utils/index.js";

import { getProfile } from "../../utils/middleware.js";

import * as controller from "./controller.js";
import validation from "./validation.js";

const route = Router();

route.get("/contract", controller.listContract);
route.get(
  "/contract/:id",
  inputValidator(validation.getContract),
  getProfile,
  controller.getContract
);

export default route;
