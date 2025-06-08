import News from "../model/news.js";
import categories from "../model/category.js";
import reporters from "../model/reporter.js";

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
  console.log(req);

  const { id, title, content, status, category, image } = req.body;
  const { categoryId } = await categories.findOne({
    where: { category_name: category },
  });
  try {
    const news = await News.create({
      title,
      content,
      status,
      image_url: image,
      reporterId: id,
      categoryId,
    });
    res.status(201).json({ message: "Added successfully", categoryId });
  } catch (error) {
    console.log("Error in getProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
