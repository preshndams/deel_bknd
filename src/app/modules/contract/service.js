import { Op, or } from "sequelize";

import { CONTRACT_STATUS } from "../../utils/constant.js";
import { Contract } from "../../utils/models.js";

export const getContract = async ({ id }) => {
  const contract = await Contract.findOne({ where: { id } }, { raw: true });
  if (!contract) throw new Error("Contract not found");

  return {
    success: true,
    data: contract,
    message: "Contract details",
  };
};

export const listContracts = async () => {
  const contract = await Contract.findAll(
    {
      where: {
        [Op.or]: [
          {
            status: CONTRACT_STATUS.in_progress,
          },
          { status: CONTRACT_STATUS.newContract },
        ],
      },
    },
    { raw: true }
  );
  if (!contract) return "Contract list is empty";

  return {
    success: true,
    data: contract||[],
    message: "List of all contracts",
  };
};
