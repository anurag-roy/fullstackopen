const jwt = require("jsonwebtoken");
const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

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

  const blog = new Blog(request.body);

  const savedBlog = await blog.save();
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
  await Blog.findByIdAndRemove(request.params.blogId);

  response.status(204).end();
});

module.exports = blogsRouter;
