import { QueryTypes } from "sequelize";
import db from "../../utils/db.js";
import { checkPercent } from "../../utils/index.js";
import Contract from "../contract/model.js";
import Job from "../job/model.js";
import Profile from "./model.js";

export const deposit = async ({ userId: id }, { amount }) => {
  const profile = await Profile.findByPk(id);
  if (!profile) throw new Error("Profile not found");

  const [getTotal] = await db.query(
    `
        SELECT SUM(t1.price)totalPrice
        FROM ${Job.table} t1
        INNER JOIN ${Contract.table} t2 ON t1.ContractId = t2.id
        INNER JOIN ${Profile.table} t3 ON t3.id = t2.ClientId
        WHERE t2.status != 'terminated' AND t3.id = ${id}
    `,
    { type: QueryTypes.SELECT }
  );

  const checkPrice = checkPercent(getTotal.totalPrice);
  if (amount >= checkPrice)
    throw new Error("Cannot deposit more than 25% of jobs to pay");

  const newBalance = profile.balance + amount;

  await profile.update({ balance: newBalance });
  return {
    success: true,
    data: profile,
    message: `Deposit of ${amount} successful, Current balance is ${newBalance}`,
  };
};

export const view = async ({ userId: id }) => {
  const profile = await Profile.findByPk(id);
  if (!profile) throw new Error("Profile not found");

  return {
    success: true,
    data: profile,
    message: "Profile details",
  };
};
