import reporters from "../model/reporter.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export const login = async (req, res) => {
  const { email, password } = req.body.form;
  const reporter = await reporters.findOne({ where: { email } });
  const { databasePassword } = reporter;
  if (!reporter)
    return res.status(400).json({ message: "user does not exists" });

  console.log(reporter);

  if (password != reporter.password) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  const token = jwt.sign({ id: reporter.id }, process.env.ACCESS_TOKEN_SECRET);
  res
    .status(201)
    .json({ message: "Login SuccessFull", data: { reporter, token } });
};
export const getAllNewsByReporter = async (req, res) => {
  const id = req.body.id;
};
