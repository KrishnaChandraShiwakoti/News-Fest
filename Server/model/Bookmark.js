import db from "../config/db.js";
import { DataTypes } from "sequelize";

const Bookmarks = db.define("bookmarks", {
  bookmarkId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: "Users",
      key: "id",
    },
  },
  newsId: {
    type: DataTypes.INTEGER,
    references: {
      model: "news",
      key: "newsId",
    },
  },
});

export default Bookmarks;
