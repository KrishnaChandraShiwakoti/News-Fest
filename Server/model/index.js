import News from "./news.js";
import Reporter from "./reporter.js";
import Category from "./category.js";
import Images from "./images.js";
import Bookmarks from "./Bookmark.js";

// Reporter - News
Reporter.hasMany(News, {
  foreignKey: "reporterId",
  as: "news",
});
News.belongsTo(Reporter, {
  foreignKey: "reporterId",
  as: "reporter",
});

// Category - News
Category.hasMany(News, {
  foreignKey: "categoryId",
  as: "news",
});
News.belongsTo(Category, {
  foreignKey: "categoryId",
  as: "category",
});

//news-image
News.belongsTo(Images, { foreignKey: "imageId", as: "image" });
Bookmarks.belongsTo(News, { foreignKey: "newsId" });
// Optionally, News.hasMany(Bookmarks, { foreignKey: "newsId" });
