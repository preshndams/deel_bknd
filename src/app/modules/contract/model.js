import { DataTypes } from "sequelize";

import { CONTRACT_STATUS } from "../../utils/constant.js";
import db from "../../utils/db.js";

const table = "contracts";

const schema = {
  terms: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM(...Object.values(CONTRACT_STATUS)),
  },
};

const Contract = db.define(table, schema, {
  
});
Contract.table = table;

export default Contract;
