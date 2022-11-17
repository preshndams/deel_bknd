import { DataTypes } from "sequelize";

import db from "../../utils/db.js";

const table = "jobs";
const schema = {
  description: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false,
  },
  paid: {
    type: DataTypes.BOOLEAN,
    default: false,
  },
  paymentDate: {
    type: DataTypes.DATE,
  },
};

const Job = db.define(table, schema);
Job.table = table;

export default Job;
