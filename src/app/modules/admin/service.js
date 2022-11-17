import { QueryTypes } from "sequelize";

import Contract from "../contract/model.js";
import Job from "../job/model.js";
import Profile from "../profile/model.js";
import db from "../../utils/db.js";

export const getHighestProfession = async ({ start, end }) => {
  const [details] = await db.query(
    `
        SELECT MAX(SUM(price)) OVER(PARTITION BY profession) totalPrice,profession
        FROM ${Job.table} t1
        INNER JOIN ${Contract.table} t2 ON t1.contractId = t2.id
        INNER JOIN ${Profile.table} t3 ON t2.ContractorId = t3.id
        WHERE DATE(t1.paymentDate) BETWEEN DATE('${start}') AND DATE('${end}')
    `,
    { type: QueryTypes.SELECT }
  );

  return {
    success: true,
    data: details ? details : [],
    message: "Search result",
  };
};

export const getBestClient = async ({ start, end, limit }) => {
  const details = await db.query(
    `
        SELECT DISTINCT t3.id, firstName ||' '|| lastName AS fullName, SUM(price) OVER(PARTITION BY t3.id) paid
        FROM ${Job.table} t1
        INNER JOIN ${Contract.table} t2 ON t1.contractId = t2.id
        INNER JOIN ${Profile.table} t3 ON t2.ClientId = t3.id
        WHERE DATE(t1.paymentDate) BETWEEN DATE('${start}') AND DATE('${end}')

    `,
    { type: QueryTypes.SELECT }
  );

  const result = details.sort((a, b) => b.paid - a.paid).slice(0, limit);

  return {
    success: true,
    data: result ? result : [],
    message: "Search result",
  };
};
