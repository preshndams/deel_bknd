import { Op } from "sequelize";
import { CONTRACT_STATUS } from "../../utils/constant.js";
import db from "../../utils/db.js";
import { Contract, Job, Profile } from "../../utils/models.js";

export const listJobs = async (query) => {
  const { paid } = query;
  let list = await Job.findAll({
    where: { paid: JSON.parse(paid) },
    include: {
      model: Contract,
      as: "ContractInfo",
      where: {
        [Op.or]: [
          { status: CONTRACT_STATUS.in_progress },
          { status: CONTRACT_STATUS.newContract },
        ],
      },
      include: [
        {
          model: Profile,
          as: "Client",
        },
        {
          model: Profile,
          as: "Contractor",
        },
      ],
    },
  });

  return {
    success: true,
    data: list,
    message: "Job details",
  };
};

export const view = async ({ id }) => {
  const job = await Job.findByPk(id, { raw: true });
  if (!job) throw new Error("Job not found");

  return {
    success: true,
    data: job,
    message: "Job details",
  };
};

export const pay = async (profile, { job_id }) => {
  return await db.transaction(async (transaction) => {
    let job = await Job.findOne({ where: { ContractId: job_id } });
    if (!job) throw new Error("Job not found");
    const amount = job.price;

    let contract = await Contract.findOne({
      where: { id: job.ContractId },
    });

    if (contract.status === CONTRACT_STATUS.terminated)
      throw new Error("Contract is already terminated");

    if (profile.id !== contract.ClientId)
      throw new Error("Unauthorized client, cannot proceed");

    let contractor = await Profile.findByPk(contract.ContractorId);

    if (profile.balance <= amount) throw new Error("Insufficient balance");

    const clientBalance = profile.balance - amount;
    const contractorBalance = contractor.balance + amount;

    //update client balance
    await Profile.update(
      { balance: clientBalance },
      { where: { id: profile.id } },
      { transaction }
    );

    //update contractor balance
    await Profile.update(
      { balance: contractorBalance },
      { where: { id: contractor.id } },
      { transaction }
    );

    //update job
    await job.update(
      { paid: true, price: amount, paymentDate: new Date() },
      { transaction }
    );

    //update contract
    await contract.update(
      { status: CONTRACT_STATUS.terminated },
      { transaction }
    );

    return {
      success: true,
      data: [],
      message: "Payment made successfully and contract terminated",
    };
  });
};
