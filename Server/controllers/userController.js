import User from "../model/user.js";
import bcrypt from "bcrypt";

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
export const updateUser = async (req, res) => {
  const { email } = req.params;
  const updates = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Only update fields provided in req.body
    for (const key of Object.keys(updates)) {
      if (
        updates[key] !== undefined &&
        updates[key] !== null &&
        updates[key] !== ""
      ) {
        if (key === "password") {
          // Hash password before saving
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(updates.password, salt);
        } else {
          user[key] = updates[key];
        }
      }
    }
    await user.save();
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Failed to update profile",
      error: err.message,
    });
  }
};
