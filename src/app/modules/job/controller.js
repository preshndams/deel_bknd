import * as service from "./service.js";

export const listJobs = async (req, res, next) => {
  try {
    return res.status(200).json(await service.listJobs(req.query));
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

export const pay = async (req, res, next) => {
  try {
    return res
      .status(200)
      .json(await service.pay(req.profile, req.params));
  } catch (err) {
    next(err);
  }
};
