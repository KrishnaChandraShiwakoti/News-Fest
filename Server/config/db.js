import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { Sequelize } from "sequelize";
const { PGUSER, PGDATABASE, PGHOST, PGPASSWORD } = process.env;

const db = new Sequelize(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`,
  {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // if Neon uses self-signed certs or your config needs this
      },
    },
  }
);
const authenticate = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
authenticate();

export default db;
