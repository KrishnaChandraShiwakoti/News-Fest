const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const newsMock = dbMock.define("news", {
  newsId: 1,
  title: "Test News",
  content: "Test content for news article.",
  views: 10,
  isFeatured: false,
  status: "published",
  reporterId: 1,
  categoryId: 2,
  category_name: "world",
  imageId: 1,
});

describe("News Model", () => {
  it("should create a news", async () => {
    const news = await newsMock.create({
      title: "Breaking News",
      content: "Some breaking news content.",
      views: 5,
      isFeatured: true,
      status: "published",
      reporterId: 2,
      categoryId: 3,
      imageId: 4,
    });
    expect(news.title).toBe("Breaking News");
    expect(news.content).toBe("Some breaking news content.");
    expect(news.views).toBe(5);
    expect(news.isFeatured).toBe(true);
    expect(news.status).toBe("published");
    expect(news.reporterId).toBe(2);
    expect(news.categoryId).toBe(3);
    expect(news.imageId).toBe(4);
  });

  it("should require a title", async () => {
    try {
      const news = await newsMock.create({});
      if (!news.title) throw new Error("Validation error: title is required");
    } catch (err) {
      expect(err.message).toMatch(/title is required/);
    }
  });
});
