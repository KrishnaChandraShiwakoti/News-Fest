import db from "../config/db.js";
import { DataTypes } from "sequelize";

const News = db.define("news", {
  newsId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  views: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  isFeatured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  status: {
    type: DataTypes.ENUM,
    values: ["draft", "published"],
  },
  reporterId: {
    type: DataTypes.INTEGER,
    references: {
      model: "reporters",
      key: "reporterId",
    },
  },
  categoryId: {
    type: DataTypes.INTEGER,
    references: {
      model: "categories",
      key: "categoryId",
    },
    imageId: {
      type: DataTypes.INTEGER,
      references: {
        model: "images",
        key: "id",
      },
    },
  },
});

export default News;
