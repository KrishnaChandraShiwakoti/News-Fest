import { neon } from "@neondatabase/serverless";
import dotenv from "dotenv";
dotenv.config({ path: "./Server/.env" });

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

// creates a SQL connection using our env variables
export const sql = neon(
  `postgresql://${PGUSER}:${PGPASSWORD}@${PGHOST}/${PGDATABASE}?sslmode=require`
);
