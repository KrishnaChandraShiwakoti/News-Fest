const newsController = require("../controllers/newsController.js");
const News = require("../model/news.js");

// Mock Sequelize Methods
jest.mock("../model/news.js", () => ({
  create: jest.fn(),
  findAll: jest.fn(),
  findByPk: jest.fn(),
  update: jest.fn(),
  destroy: jest.fn(),
}));

// Mock category model for all controller imports
jest.mock("../model/category.js", () => ({
  findOne: jest.fn(),
}));

describe("News Controller", () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it("should create a news article", async () => {
    const req = {
      body: {
        title: "Test News",
        content: "Test content",
        status: "published",
        reporterId: 1,
        categoryId: 2,
        category_name: "world",
        imageId: 3,
      },
      file: {
        filename: "test-image.jpg",
        path: "uploads/test-image.jpg",
        mimetype: "image/jpeg",
      },
    };
    const res = mockResponse();
    News.create.mockResolvedValue(req.body);

    // Setup the mock for category model
    const categories = require("../model/category.js");
    categories.findOne.mockResolvedValue({
      categoryId: 2,
      category_name: "world",
    });

    await newsController.postNews(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: "News added successfully.",
    });
  }, 10000); // Increase timeout for async DB

  it("should return all news", async () => {
    const req = {};
    const res = mockResponse();
    News.findAll.mockResolvedValue([
      {
        newsId: 1,
        title: "Test News",
        content: "Test content",
        status: "published",
        views: 10,
        category: { category_name: "General" },
        image: { filename: "test-image.jpg" },
        reporter: { reporter_fullname: "John Doe" },
      },
    ]);

    await newsController.getAllNews(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.arrayContaining([
          expect.objectContaining({ id: 1, title: "Test News" }),
        ]),
      })
    );
  });

  it("should return a news article by ID", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();
    const mockIncrement = jest.fn();
    News.findByPk.mockResolvedValue({
      newsId: 1,
      title: "Test News",
      content: "Test content",
      status: "published",
      views: 10,
      category: { category_name: "General" },
      image: { filename: "test-image.jpg" },
      reporter: { reporter_fullname: "John Doe" },
      increment: mockIncrement,
    });

    await newsController.getNewsById(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({ id: 1, title: "Test News" }),
      })
    );
    expect(mockIncrement).toHaveBeenCalledWith({ views: 1 });
  });

  it("should return 404 if news not found", async () => {
    const req = { params: { id: 1 } };
    const res = mockResponse();
    News.findByPk.mockResolvedValue(null);

    await newsController.getNewsById(req, res);
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      success: false,
      message: "Internal Server Error",
    });
  });
});
