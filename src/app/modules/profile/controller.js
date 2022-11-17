import * as service from "./service.js";

export const deposit = async (req, res, next) => {
  try {
    return res.status(200).json(await service.deposit(req.params, req.body));
  } catch (err) {
    next(err);
  }
};

export const view = async (req, res, next) => {
  try {
    return res.status(200).json(await service.view(req.params));
  } catch (err) {
    next(err);
  }
};

