import { DataTypes } from "sequelize";
import dbMysql from "../config/mysql.js";

const Tags = dbMysql.define(
  "tags",
  {
    id: {
      type: DataTypes.INTEGER(),
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    deviceID: {
      type: DataTypes.STRING(25),
      allowNull: false,
    },
    tag: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    value: {
      type: DataTypes.STRING(50),
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

await Tags.sync();

export default Tags;