import News from "../model/news.js";
import categories from "../model/category.js";
import reporters from "../model/reporter.js";
import Images from "../model/images.js";
export const getAllNews = async (req, res) => {
  const data = await News.findAll({
    include: [
      { model: categories, as: "category" },
      { model: Images, as: "image" },
      { model: reporters, as: "reporter" },
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
      id: news.newsId,
      title: news.title,
      category: news.category.category_name,
      content: news.content,
      imageUrl: news.image ? `/uploads/${news.image.filename}` : null,
      reporter: news.reporter.reporter_fullname,
    };
  });
  res.status(200).json({ data: result });
};
export const getNewsById = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await News.findByPk(id, {
      include: [
        { model: categories, as: "category" },
        { model: Images, as: "image" },
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
    await data.increment({ views: 1 });

    const result = {
      id: data.newsId,
      title: data.title,
      category: data.category ? data.category.category_name : null,
      content: data.content,
      status: data.status,
      imageUrl: data.image ? `/uploads/${data.image.filename}` : null,
      reporter: data.reporter ? data.reporter.reporter_fullname : null,
    };

    res.status(200).json({ data: result });
  } catch (error) {
    console.log("Error in getProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const getNewsByCategory = async (req, res) => {
  const category = req.params.category.toLowerCase();
  try {
    const categoryId = await categories.findOne({
      where: { category_name: category },
    });
    if (categoryId === null || categoryId.length === 0) {
      return res
        .status(404)
        .json({ message: "No data found for the given categoryName" });
    }
    console.log(categoryId.dataValues.categoryId);
    const data = await News.findAll({
      where: { categoryId: categoryId.dataValues.categoryId },
      include: [
        { model: categories, as: "category" },
        { model: Images, as: "image" },
        { model: reporters, as: "reporter" },
      ],
    });

    if (data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "News not found" });
    }
    const result = data.map((news) => {
      return {
        id: news.newsId,
        title: news.title,
        content: news.content,
        imageUrl: news.image ? `/uploads/${news.image.filename}` : null,
        reporter: news.reporter.reporter_fullname,
      };
    });

    res.status(200).json({
      data: result,
    });
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
  console.log(req.params);

  const { id } = req.params;
  await News.destroy({
    where: { newsId: id },
  });
  res.send(200).json({ message: "News deleted successfully" });
};
export const editPost = async (req, res) => {
  try {
    const { reporterId, title, content, status, category, imageType } =
      req.body;
    const { id } = req.params;

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
    await News.update(
      {
        title,
        content,
        status,
        reporterId,
        categoryId,
        imageId: image.id,
      },
      { where: { newsId: id } }
    );

    return res.status(200).json({ message: "News added successfully." });
  } catch (error) {
    console.log("Error in postNews function", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal Server Error" });
  }
};
