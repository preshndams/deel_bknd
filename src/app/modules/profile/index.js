import { Router } from "express";
import { inputValidator } from "../../utils/index.js";

import * as controller from "./controller.js";
import validation from "./validation.js";

const route = Router();

route.get("/profile/:userId", inputValidator(validation.view), controller.view);

route.post(
  "/balances/deposit/:userId",
  inputValidator(validation.deposit),
  controller.deposit
);

export default route;
