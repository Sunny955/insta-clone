const express = require("express");
const router = express.Router();
const Post = require("../model/post");
const requireLogin = require("../middleware/requireLogin");

router.get("/all-post", async (req, res) => {
  let posts = await Post.find({}).populate("postedBy", "_id name");
  if (!posts) {
    return res.status(400).json({
      error: "No posts available",
    });
  }
  res.status(200).json({ posts });
});

router.post("/create-post", requireLogin, (req, res) => {
  const { title, body } = req.body;

  if (!title || !body) {
    return res.status(422).json({
      error: "Please provide all the fields",
    });
  }
  req.user.password = undefined;
  const post = new Post({
    title,
    body,
    postedBy: req.user,
  });
  post.save((err, data) => {
    if (data) {
      res.status(200).json({
        code: 200,
        message: "Added new post successfully!",
        post: data,
      });
    } else {
      res.status(500).json(err);
    }
  });
});

router.get("/my-post", requireLogin, async (req, res) => {
  let myposts = await Post.find({ postedBy: req.user._id }).populate(
    "postedBy",
    "_id name"
  );
  res.json({ myposts });
});

module.exports = router;
