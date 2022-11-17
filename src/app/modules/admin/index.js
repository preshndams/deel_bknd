import { Router } from "express";
import { inputValidator } from "../../utils/index.js";

import * as controller from "./controller.js";
import validation from "./validation.js";

const route = Router();


route.get(
  "/admin/best-profession",
  inputValidator(validation.getHighestProfession),
  controller.getHighestProfession
);

route.get(
  "/admin/best-clients",
  inputValidator(validation.getBestClient),
  controller.getBestClient
);


export default route;
