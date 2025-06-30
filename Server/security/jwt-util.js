import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const generateToken = (payload) => {
  const options = {
    expiresIn: process.env.EXPIRES_IN,
  };
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, options);
};
