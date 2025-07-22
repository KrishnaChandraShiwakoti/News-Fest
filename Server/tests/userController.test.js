jest.mock("../model/user.js", () => ({
  findOne: jest.fn(),
}));
jest.mock("bcrypt", () => ({
  genSalt: jest.fn(() => Promise.resolve("salt")),
  hash: jest.fn((pw, salt) => Promise.resolve("hashed" + pw)),
}));

const userController = require("../controllers/userController.js");
const user = require("../model/user.js");

describe("User Controller", () => {
  const mockResponse = () => {
    const res = {};
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res;
  };

  it("should get user info", async () => {
    const req = {
      params: {
        email: "test@email.com",
      },
    };
    const res = mockResponse();
    user.findOne.mockResolvedValue({
      username: "testuser",
      fullname: "Test User",
      email: "test@email.com",
      contact: "1234567890",
    });

    await userController.getUserInfo(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        username: "testuser",
        fullname: "Test User",
        email: "test@email.com",
        contact: "1234567890",
      })
    );
  });

  it("should update user", async () => {
    const req = {
      params: {
        email: "test@email.com",
      },
      body: {
        fullname: "Updated Name",
        password: "newpassword",
      },
    };
    const res = mockResponse();
    const saveMock = jest.fn().mockResolvedValue(true);
    user.findOne.mockResolvedValue({
      username: "testuser",
      fullname: "Old Name",
      email: "test@email.com",
      contact: "1234567890",
      password: "oldpassword",
      save: saveMock,
    });

    await userController.updateUser(req, res);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: "Profile updated successfully",
    });
    expect(saveMock).toHaveBeenCalled();
  });
});
