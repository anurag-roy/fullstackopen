const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  id: String,
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  url: String,
  likes: {
    type: Number,
    default: 0,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedBlog) => {
    returnedBlog.id = returnedBlog._id.toString();
    delete returnedBlog._id;
    delete returnedBlog.__v;
  },
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
