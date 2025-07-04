import User from "../model/user.js";
import bcrypt from "bcrypt";
import { generateToken } from "../security/jwt-util.js";

const saltRounds = 10;

export const register = async (req, res) => {
  const { fullname, username, email, password, phone } = req.body;
  console.log(req.body);

  if (
    fullname == null ||
    username == null ||
    email == null ||
    password == null ||
    phone == null
  ) {
    return res
      .status(500)
      .json({ message: "Please provide all the required filed" });
  }
  let user = await User.findOne({ where: { email } });
  if (user != null) {
    return res.status(500).json({ message: "User already exits" });
  }
  bcrypt.hash(password, saltRounds, async (err, hash) => {
    if (err) {
      console.log("Error hashing password", err);
    } else {
      await User.create({
        fullname,
        email,
        username,
        password: hash,
        contact: phone,
      });
      return res.status(201).json({ message: "User registered successfully" });
    }
  });
};

export const login = async (req, res) => {
  console.log(req.body);

  try {
    if (req.body.email == null) {
      return res.status(500).json({ message: "email is required" });
    } else if (req.body.password == null) {
      return res.status(500).json({ message: "password is required" });
    }
    const user = await User.findOne({ where: { email: req.body.email } });
    if (!user) {
      return res.status(500).json({ message: "User not found" });
    }
    bcrypt.compare(req.body.password, user.password, (err, result) => {
      if (err) {
        console.error("Error comparing passwords:", err);
      } else {
        if (result) {
          const token = generateToken({ id: user.id });
          return res.status(200).json({
            fullname: user.fullname,
            user_id: user.id,
            email: user.email,
            token,
          });
        } else {
          res.status(400).json({ message: "Incorrect password" });
        }
      }
    });
  } catch (error) {
    res.status(500).json({ error: "failed to login" });
  }
};
