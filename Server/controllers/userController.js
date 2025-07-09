import User from "../model/user";

export const getUserInfo = async (req, res) => {
  const { email } = req.params;
  const user = await User.findOne({ where: { email } });
  if (!user || user == null) {
    res.status(400).json({ message: "User Does not Exists" });
  }
  res.status(200).json({
    username: user.username,
    fullname: user.fullname,
    email: user.email,
    contact: user.contact,
  });
};
