import React, { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import loginService from './services/login';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  // Load user details if present
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // Fetch all blogs
  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  // Login Handler
  const login = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));

      blogService.setToken(user.token);
      setUser(user);
      setUsername('');
      setPassword('');

      setMessageType('success');
      setMessage('logged in successfully');
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    } catch (exception) {
      setMessageType('error');
      setMessage('wrong username or password');
      setTimeout(() => {
        setMessage(null);
        setMessageType(null);
      }, 5000);
    }
  };

  // Logout Handler
  const logout = () => {
    setUser(null);
    window.localStorage.clear();

    setMessageType('success');
    setMessage('logged out successfully');
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 5000);
  };

  const createBlog = async (event) => {
    event.preventDefault();

    const newBlog = await blogService.create({
      title,
      author,
      url,
    });
    setTitle('');
    setAuthor('');
    setUrl('');

    const newBlogs = [...blogs];
    newBlogs.push(newBlog);
    setBlogs(newBlogs);

    setMessageType('success');
    setMessage(`a new blog ${newBlog.title} by ${newBlog.author} added`);
    setTimeout(() => {
      setMessage(null);
      setMessageType(null);
    }, 5000);
  };

  // Login Form
  const loginForm = () => (
    <>
      <h2>Log in to application</h2>
      <form onSubmit={login}>
        <div>
          username
          <input
            name="username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </div>
        <div>
          password
          <input
            name="password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );

  // New Blog Form
  const blogForm = () => (
    <>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
        <div>
          title:
          <input
            name="title"
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
          />
        </div>
        <div>
          author:
          <input
            name="author"
            type="text"
            value={author}
            onChange={(event) => setAuthor(event.target.value)}
          />
        </div>
        <div>
          url:
          <input
            name="url"
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );

  // If no user is logged in, show login screen
  if (user === null) {
    return (
      <div>
        <Notification message={message} type={messageType} />
        {loginForm()}
      </div>
    );
  }

  // If a user is logged in, show list of blogs
  return (
    <div>
      <Notification message={message} type={messageType} />
      <h2>blogs</h2>
      <div>
        {user.name} logged in
        <button onClick={logout}>logout</button>
      </div>
      <br />
      {blogForm()}
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
};

export default App;
