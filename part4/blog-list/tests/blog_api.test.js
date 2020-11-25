const supertest = require("supertest");
const mongoose = require("mongoose");
const helper = require("./test_helper");
const app = require("../app");
const Blog = require("../models/blog");

const api = supertest(app);

let token;

beforeAll(async () => {
  const userBody = {
    username: "anuragroy",
    password: "test@2020",
  };

  await api.post("/api/users").send(userBody);

  const { body: loggedInUser } = await api.post("/api/login").send(userBody);
  token = loggedInUser.token;
});

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

test("number of returned blogs is correct", async () => {
  const { body: blogList } = await api.get("/api/blogs");
  expect(blogList).toHaveLength(helper.initialBlogs.length);
});

test("id is defined", async () => {
  const { body: blogList } = await api.get("/api/blogs");
  blogList.forEach((b) => expect(b.id).toBeDefined());
});

test("respond with 401 on unauthorized", async () => {
  const newBlog = {
    title: "A valid blog",
    author: "Anurag Roy",
    url: "https://github.com/anurag2pirad/myBlog",
    likes: 69,
  };

  const response = await api.post("/api/blogs").send(newBlog).expect(401);

  console.log(response.body.error);
  expect(response.body.error).toBe("invalid token");

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test("a valid blog can be added when authorized", async () => {
  const newBlog = {
    title: "A valid blog",
    author: "Anurag Roy",
    url: "https://github.com/anurag2pirad/myBlog",
    likes: 69,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .set({ Authorization: `Bearer ${token}` })
    .expect(201)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);
});

test("default value of likes is set to 0", async () => {
  const newBlogWithoutLikes = {
    title: "An invalid blog without likes",
    author: "Anurag Roy",
    url: "https://github.com/anurag2pirad/notMyBlog",
  };

  const { body: createdBlog } = await api
    .post("/api/blogs")
    .send(newBlogWithoutLikes)
    .set({ Authorization: `Bearer ${token}` })
    .expect(201)
    .expect("Content-Type", /application\/json/);

  expect(createdBlog.likes).toBe(0);
});

test("respond with 400 on missing title or url", async () => {
  const newInvalidBlog = {
    author: "Anurag Roy",
    likes: 23,
  };

  await api
    .post("/api/blogs")
    .send(newInvalidBlog)
    .set({ Authorization: `Bearer ${token}` })
    .expect(400);
});

afterAll(() => {
  mongoose.connection.close();
});
