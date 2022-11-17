import { DataTypes } from "sequelize";

import db from "../../utils/db.js";

const table = "profiles";
const schema = {
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  profession: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  balance: {
    type: DataTypes.DECIMAL(12, 2),
  },
  type: {
    type: DataTypes.ENUM("client", "contractor"),
  },
};

export const Profile = db.define(table, schema);
Profile.table = table;

export default Profile;
