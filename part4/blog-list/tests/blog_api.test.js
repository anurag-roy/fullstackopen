const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

beforeEach(async () => {
  await Blog.deleteMany({});

  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test("blogs are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("number of returned notes is 5", async () => {
  const { body: blogList } = await api.get("/api/blogs");
  expect(blogList).toHaveLength(helper.initialBlogs.length);
});

test("id is defined", async () => {
  const { body: blogList } = await api.get("/api/blogs");
  blogList.forEach((b) => expect(b.id).toBeDefined());
});

afterAll(() => {
  mongoose.connection.close();
});
