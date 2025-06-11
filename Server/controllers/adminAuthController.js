import reporters from "../model/reporter.js";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import News from "../model/news.js";
import categories from "../model/category.js";
import images from "../model/images.js";

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
  const id = req.params.id;
  if (!id || id == null) {
    return res.status(400).json({ message: "ID is required" }); // Handle missing ID case
  }

  try {
    const data = await News.findAll({
      where: { reporterId: id },
      include: [
        { model: categories, as: "category" },
        { model: images, as: "image" },
      ],
    });

    // Check if data exists
    if (data.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for the given reporterId" });
    }
    const result = data.map((news) => {
      return {
        ...news.toJSON(),
        imageUrl: news.image ? `/uploads/${news.image.filename}` : null,
      };
    });

    res.status(200).json({
      message: "Fetched successfully",
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching data" });
  }
};
