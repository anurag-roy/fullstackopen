const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");

usersRouter.get("/", async (request, response) => {
  const users = await User.find({}).populate("blogs", { url: 1, title: 1, author: 1 });
  response.json(users.map((u) => u.toJSON()));
});

usersRouter.post("/", async ({ body }, response) => {
  if (!body.password) {
    response
      .status(400)
      .json({ error: "User validation failed: username: Path `password` is required." });
  }

  if (body.password.length < 3) {
    response.status(400).json({
      error:
        "User validation failed: username: Path `password` is shorter than the minimum allowed length (3).",
    });
  }

  const saltRounds = 11;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.json(savedUser);
});

module.exports = usersRouter;
