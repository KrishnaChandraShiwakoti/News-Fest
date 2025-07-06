import Bookmark from "../model/Bookmark.js";
import News from "../model/news.js";
import reporters from "../model/reporter.js";
import Images from "../model/images.js";
export const addToBookmark = async (req, res) => {
  console.log(req.body);

  const { userId, newsId } = req.body;
  try {
    const existing = await Bookmark.findOne({ where: { userId, newsId } });
    if (existing)
      return res.status(400).json({ message: "Already bookmarked." });
    await Bookmark.create({ userId, newsId });
    res.json({ message: "News bookmarked successfully." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to bookmark." });
  }
};
export const getBookmarks = async (req, res) => {
  console.log(req.body);
  const { userId } = req.params;
  try {
    const bookmarks = await Bookmark.findAll({
      where: { userId },
      include: [
        {
          model: News,
          include: [
            { model: Images, as: "image" },
            { model: reporters, as: "reporter" },
          ],
        },
      ],
    });
    if (bookmarks === null || bookmarks.length === 0) {
      return res
        .status(404)
        .json({ message: "You haven't bookmarked any thing" });
    }
    const result = bookmarks.map((bookmark) => {
      const news = bookmark.news;

      return {
        bookmarkId: bookmark.bookmarkId,
        newsId: news.newsId,
        title: news.title,
        content: news.content,
        imageUrl: news.image ? `/uploads/${news.image.filename}` : null,
        reporter: news.reporter ? news.reporter.reporter_fullname : null,
      };
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch bookmarks." });
  }
};
export const deleteBookmark = async (req, res) => {
  const { bookmarkId } = req.params;
  await Bookmark.destroy({ where: { bookmarkId } });
  res.send(200).json({ message: "Bookmark removed successfully" });
};
