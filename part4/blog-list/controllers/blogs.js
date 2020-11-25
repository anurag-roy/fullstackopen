const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");

blogsRouter.get("/", async (request, response) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1, id: 1 });
  response.json(blogs.map((blog) => blog.toJSON()));
});

blogsRouter.post("/", async (request, response) => {
  const { token } = request;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);

  const blog = new Blog({ ...request.body, author: user.name, user: user._id });

  const savedBlog = await blog.save();
  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  response.status(201).json(savedBlog.toJSON());
});

blogsRouter.put("/:blogId", async ({ body, params }, response) => {
  let blog = {};

  if (body.likes) {
    blog.likes = body.likes;
  }
  const updatedBlog = await Blog.findByIdAndUpdate(params.blogId, blog, { new: true });

  response.json(updatedBlog.toJSON());
});

blogsRouter.delete("/:blogId", async (request, response) => {
  const { token } = request;
  const decodedToken = jwt.verify(token, process.env.SECRET);

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: "token missing or invalid" });
  }

  const blog = await Blog.findById(request.params.blogId);

  console.log(blog.user);

  if (blog.user.toString() === userid.toString()) response.status(204).end();
});

module.exports = blogsRouter;
