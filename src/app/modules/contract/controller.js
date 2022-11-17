import * as service from "./service.js";

export const getContract = async (req, res, next) => {
  try {
    return res.status(200).json(await service.getContract(req.profile));
  } catch (err) {
    next(err);
  }
};

export const listContract = async (req, res, next) => {
  try {
    return res.status(200).json(await service.listContracts());
  } catch (err) {
    next(err);
  }
};
