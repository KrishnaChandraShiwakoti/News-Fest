import News from "../model/news.js";
import categories from "../model/category.js";
import reporters from "../model/reporter.js";
import Images from "../model/images.js";
export const getAllNews = async (req, res) => {
  const news = await News.findAll();
  res.status(201).json({ data: news });
};

export const getNewsById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await News.findByPk(id, {
      include: [
        { model: categories, as: "category" },
        { model: reporters, as: "reporter" },
      ],
    });
    if (data.views > 1000) {
      await News.update(
        {
          isFeatures: true,
        },
        { where: id }
      );
    }
    await data.increment({
      views: 1,
    });
    if (data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "News not found" });
    }
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.log("Error in getProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const getNewsByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    const data = await News.findAll({
      include: [
        {
          model: categories,
          as: "category",
          where: {
            category_name: category,
          },
        },
        {
          model: reporters,
          as: "reporter",
        },
      ],
    });

    if (data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "News not found" });
    }
    res.status(200).json({ success: true, data: data });
  } catch (error) {
    console.log("Error in getProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const postNews = async (req, res) => {
  try {
    const { reporterId, title, content, status, category, imageType } =
      req.body;

    // Check if file is uploaded
    if (!req.file) {
      return res.status(400).json({ message: "No image uploaded." });
    }

    const { filename, path } = req.file;

    // Create image record
    const image = await Images.create({
      filename,
      path,
    });

    // Find category
    const categoryRecord = await categories.findOne({
      where: { category_name: category },
    });

    if (!categoryRecord) {
      return res.status(400).json({ message: "Invalid category." });
    }

    const { categoryId } = categoryRecord;

    // Create news record
    await News.create({
      title,
      content,
      status,
      reporterId,
      categoryId,
      imageId: image.id,
    });

    return res.status(201).json({ message: "News added successfully." });
  } catch (error) {
    console.log("Error in postNews function", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
export const deletePost = async (req, res) => {
  const { newsId } = req.body;
  await News.destroy({
    where: { newsId },
  });
  res.send(200).json({ message: "News deleted successfully" });
};
