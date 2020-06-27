const _ = require("lodash");

// eslint-disable-next-line no-unused-vars
const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((totalLikes, blog) => {
    return totalLikes + blog.likes;
  }, 0);
};

const favouriteBlog = (blogs) => {
  if (blogs.length === 0) return {};

  const { title, author, likes } = blogs.sort((b1, b2) => b2.likes - b1.likes)[0];
  return { title, author, likes };
};

const mostBlogs = (blogList) => {
  if (_.isEmpty(blogList)) return {};

  const [author, blogs] = _(blogList).countBy("author").entries().maxBy(_.last);
  return { author, blogs };
};

const mostLikes = (blogs) => {
  if (_.isEmpty(blogs)) return {};

  return _(blogs)
    .groupBy("author")
    .map((objects, key) => ({
      author: key,
      likes: _.sumBy(objects, "likes"),
    }))
    .maxBy("likes");
};

module.exports = {
  dummy,
  totalLikes,
  favouriteBlog,
  mostBlogs,
  mostLikes,
};
