import db from "../config/db.js";
import { DataTypes } from "sequelize";

const reporters = db.define(
  "reporters",
  {
    reporterId: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    reporter_fullname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profile_picture: {
      type: DataTypes.STRING,
    },
  },
  { timestamps: false }
);

export default reporters;
