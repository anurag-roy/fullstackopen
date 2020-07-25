const supertest = require("supertest");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const app = require("../app");

const api = supertest(app);

describe("do not create user", () => {
  test("on no username", async () => {
    const userWithoutUsername = {
      name: "Anurag Roy",
      password: "test123",
    };

    const response = await api.post("/api/users").send(userWithoutUsername).expect(400);
    expect(response.body.error).toBe(
      "User validation failed: username: Path `username` is required.",
    );
  });

  test("on short username", async () => {
    const userWithShortUsername = {
      username: "an",
      name: "Anurag Roy",
      password: "test123",
    };

    const response = await api.post("/api/users").send(userWithShortUsername).expect(400);
    expect(response.body.error).toBe(
      "User validation failed: username: Path `username` (`an`) is shorter than the minimum allowed length (3).",
    );
  });

  test("on existing username", async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("test123", 11);
    const user = new User({ username: "anuragroy11", name: "Anurag Roy", passwordHash });

    await user.save();

    const userWithExistingUsername = {
      username: "anuragroy11",
      name: "Anurag Roy New",
      password: "test123",
    };

    const response = await api.post("/api/users").send(userWithExistingUsername).expect(400);
    expect(response.body.error).toBe(
      "User validation failed: username: Error, expected `username` to be unique. Value: `anuragroy11`",
    );
  });

  test("on no password", async () => {
    const userWithoutPassword = {
      username: "anuragroy11",
      name: "Anurag Roy",
    };

    const response = await api.post("/api/users").send(userWithoutPassword).expect(400);
    expect(response.body.error).toBe(
      "User validation failed: username: Path `password` is required.",
    );
  });

  test("on short password", async () => {
    const userWithShortPassword = {
      username: "anuragroy11",
      name: "Anurag Roy",
      password: "te",
    };

    const response = await api.post("/api/users").send(userWithShortPassword).expect(400);
    expect(response.body.error).toBe(
      "User validation failed: username: Path `password` is shorter than the minimum allowed length (3).",
    );
  });

  afterAll(() => {
    mongoose.connection.close();
  });
});
