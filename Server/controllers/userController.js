import { sql } from "../config/db.js";
export const getAllNews = async (req, res) => {
  try {
    const news =
      await sql`SELECT news.id, title, content,image_url,status, created_at,category_name,reporter_fullname
FROM news
JOIN category ON news.category_id = category.id
JOIN reporter ON news.reporter_id = reporter.id
ORDER BY created_at DESC
LIMIT 10`;
    res.status(200).json({ success: true, data: news });
    if (!news || news.length === 0) {
      res.status(404).json({ success: false, message: "No news found" });
    }
  } catch (error) {
    console.error("Error fetching news:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const getNewsById = async (req, res) => {
  const id = req.params.id;
  try {
    const data =
      await sql`SELECT news.id, title, content,image_url,status, created_at,category_name,reporter_fullname
      FROM news
      JOIN category ON news.category_id = category.id
      JOIN reporter ON news.reporter_id = reporter.id
      WHERE news.id = ${id}`;
    if (data.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "News not found" });
    }
    res.status(200).json({ success: true, data: data[0] });
  } catch (error) {
    console.log("Error in getProduct function", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
export const getNewsByCategory = async (req, res) => {
  const category = req.params.category;

  try {
    const data = await sql`select
          news.id,
          title,
          content,
          image_url,
          category_name
          from news
          JOIN category ON news.category_id = category.id
          where category.category_name = ${category}
          `;
    console.log(data);

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
