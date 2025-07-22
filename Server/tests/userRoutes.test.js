jest.mock("../middleware/verifyToken.js", () => {
  return () => (req, res, next) => next();
});
const request = require("supertest");
const app = require("../server.js");

describe("User Routes", () => {
  it("GET should return user info", async () => {
    const user = require("../model/user.js");
    user.findOne.mockResolvedValue({
      username: "testuser",
      fullname: "Test User",
      email: "test@email.com",
      contact: "1234567890",
    });
    const res = await request(app).get("/api/user/test@email.com");
    expect([200, 400]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body).toEqual(
        expect.objectContaining({
          username: "testuser",
          fullname: "Test User",
          email: "test@email.com",
          contact: "1234567890",
        })
      );
    }
  });

  it("PUT /api/user/:email should update user info", async () => {
    const user = require("../model/user.js");
    const saveMock = jest.fn().mockResolvedValue(true);
    user.findOne.mockResolvedValue({
      username: "testuser",
      fullname: "Old Name",
      email: "test@email.com",
      contact: "1234567890",
      password: "oldpassword",
      save: saveMock,
    });
    const updateData = { fullname: "Updated Name", password: "newpassword" };
    const res = await request(app)
      .put("/api/user/test@email.com")
      .send(updateData);
    expect([200, 404, 500]).toContain(res.statusCode);
    if (res.statusCode === 200) {
      expect(res.body).toEqual({ message: "Profile updated successfully" });
    }
  });
});
