import Contract from "../modules/contract/model.js";
import Job from "../modules/job/model.js";
import Profile from "../modules/profile/model.js";

Profile.hasMany(Contract, { as: "Contractor", foreignKey: "ContractorId" });
Contract.belongsTo(Profile, { as: "Contractor" });

Profile.hasMany(Contract, { as: "Client", foreignKey: "ClientId" });
Contract.belongsTo(Profile, { as: "Client" });

Job.belongsTo(Contract, { as: "ContractInfo", foreignKey: "ContractId"});
Contract.hasMany(Job, { as: "ContractInfo" ,foreignKey: "ContractId"});

export { Contract, Job, Profile };
