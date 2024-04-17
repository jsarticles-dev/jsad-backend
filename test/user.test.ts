import {
  afterAll,
  afterEach,
  beforeAll,
  describe,
  it,
  jest,
  expect,
} from "@jest/globals";

import {
  connectDB,
  dropCollections,
  dropDB,
} from "../configs/mongoMemoryServer";

import {
  UserModel,
  createUser,
  deleteUserById,
  findUserByEmail,
  findUserById,
  findUsers,
} from "../model/user";

jest.useRealTimers();

describe("User Models", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await dropDB();
  });

  afterEach(async () => {
    await dropCollections();
  });

  it("should insert a doc into user collection", async () => {
    const MOCK_USER = {
      email: "test@yopmail.com",
    };

    const createdUser = await createUser(MOCK_USER.email);

    expect(createdUser.email).toBe(MOCK_USER.email);
    expect(createdUser.sentNewsletters).toEqual([]);
    expect(createdUser.createdAt).toBeInstanceOf(Date);
    expect(createdUser.updatedAt).toBeInstanceOf(Date);
  });

  it("should find all users", async () => {
    const MOCK_USERS = [
      {
        email: "test@outlook.com",
      },
      {
        email: "test@gmail.com",
      },
    ];

    await createUser(MOCK_USERS[0].email);
    await createUser(MOCK_USERS[1].email);

    const users = await findUsers([]);

    expect(users).toBeDefined();
    expect(users.length).toBeGreaterThan(0);

    users.forEach((user) => {
      expect(user).toBeInstanceOf(UserModel);
    });
  });

  it("should find user by email", async () => {
    const MOCK_USERS = [
      {
        email: "test@outlook.com",
      },
      {
        email: "test@gmail.com",
      },
    ];

    await createUser(MOCK_USERS[0].email);
    await createUser(MOCK_USERS[1].email);

    const user = await findUserByEmail("test@outlook.com");

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(UserModel);
    expect(user?.email).toBe("test@outlook.com");
    expect(user?.email).not.toBe("test@gmail.com");
  });

  it("should find user by id", async () => {
    const MOCK_USER = {
      email: "test@outlook.com",
    };

    const createdUser = await createUser(MOCK_USER.email);

    const user = await findUserById(createdUser?._id?.toString() || "");

    expect(user).toBeDefined();
    expect(user).toBeInstanceOf(UserModel);
    expect(user?.email).toBe("test@outlook.com");
  });

  it("should delete user", async () => {
    const MOCK_USER = {
      email: "test@outlook.com",
    };

    const createdUser = await createUser(MOCK_USER.email);

    const deletedUser = await deleteUserById(
      createdUser?._id?.toString() || ""
    );

    expect(deletedUser).toBeDefined();
    expect(deletedUser).toBeInstanceOf(UserModel);
    expect(deletedUser?._id).toEqual(createdUser._id);
  });
});
