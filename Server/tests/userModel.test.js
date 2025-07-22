const SequelizeMock = require("sequelize-mock");
const dbMock = new SequelizeMock();

const userMock = dbMock.define("User", {
  id: 1,
  fullname: "test name",
  email: "test email",
  password: "test password",
  contact: 9863337701,
});

describe("User Model", () => {
  it("should create an item", async () => {
    const user = await userMock.create({
      fullname: "new name",
      email: "new email",
      password: "new password",
    });
    expect(user.fullname).toBe("new name");
    expect(user.email).toBe("new email");
    expect(user.password).toBe("new password");
  });
});
