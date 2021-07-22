const mongoose = require("mongoose");
const requireLogin = require("../middlewares/requireLogin");
const {clearHash} = require("../services/cache");
const cleanCache = require("../middlewares/cleanCache");
const Blog = mongoose.model("Blog");

module.exports = (app) => {
  app.get("/api/blogs/:id", requireLogin, async (req, res) => {
    const blog = await Blog.findOne({
      _user: req.user.id,
      _id: req.params.id,
    });

    res.send(blog);
  });

  app.get("/api/blogs", requireLogin, async (req, res) => {
    const blogs = await Blog.find({ _user: req.user.id }).cache({
      key: req.user.id,
    });

    res.send(blogs);

    /* const redis = require("redis");
    const redisUrl = "redis://127.0.0.1:6379";
    const client = redis.createClient(redisUrl);

    // promisfying the get function from redis 
    const util = require("util");
    client.get = util.promisify(client.get);

    //Do we have any chached data in redis related 
    // to this query
    const cachedBlogs = await client.get(req.user.id);

    //if yes, then respond to the request riht away
    //and return
    if (cachedBlogs) {
      console.log("Serving from cache");
      return res.send(JSON.parse(cachedBlogs));
    }
    //if no, we need to respond to request
    //update our cache to store data 
    const blogs = await Blog.find({ _user: req.user.id });
    console.log("Severing from MongoDB");
    res.send(blogs);
    //update our cache
    client.set(req.user.id, JSON.stringify(blogs)); */
  });

  app.post("/api/blogs", requireLogin, cleanCache, async (req, res) => {
    const { title, content } = req.body;

    const blog = new Blog({
      title,
      content,
      _user: req.user.id,
    });

    try {
      await blog.save();
      res.send(blog);
    } catch (err) {
      res.send(400, err);
    }
    //can use this but instead i will use a middleware
    // clearHash(req.user.id);
  });
};
