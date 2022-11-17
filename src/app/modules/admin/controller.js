import * as service from "./service.js";

export const getHighestProfession  = async (req, res, next) => {
  try {
    return res.status(200).json(await service.getHighestProfession(req.query));
  } catch (err) {
    next(err);
  }
};

export const getBestClient  = async (req, res, next) => {
  try {
    return res.status(200).json(await service.getBestClient(req.query));
  } catch (err) {
    next(err);
  }
};
