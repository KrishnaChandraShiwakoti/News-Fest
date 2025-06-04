import reporters from "../model/reporter.js";

export const login = async (req, res) => {
  const { email, password } = req.body;
  const reporter = await reporters.findOne({ where: { email } });
  const { databasePassword } = reporter;
  if (!reporter)
    return res.status(400).json({ message: "user does not exists" });

  console.log(reporter);

  if (password != reporter.password) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  res.status(200).json({ message: "Login SuccessFull", data: reporter });
};
