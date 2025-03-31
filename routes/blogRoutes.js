const express = require("express");
const router = express.Router();
const multer = require("multer");
const Post = require("../models/posts");

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});
const upload = multer({ storage });

// Home route: Fetch all blog posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find({});
    res.render("index", { posts });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching posts");
  }
});

// Show form to create new post
router.get("/new", (req, res) => res.render("new"));

// Add new post
router.post("/blog", upload.single("image"), async (req, res) => {
  const { title, content } = req.body;
  const newPost = new Post({ title, content, image: req.file.filename });
  await newPost.save();
  res.redirect("/");
});

// Show single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.render("show", { post });
  } catch (err) {
    console.error(err);
    res.redirect("/");
  }
});

// Show edit form
router.get("/posts/:id/edit", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("edit", { post });
});

// Update post
router.put("/posts/:id", async (req, res) => {
  await Post.findByIdAndUpdate(req.params.id, req.body);
  res.redirect("/");
});

// Delete post
router.delete("/posts/:id", async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

module.exports = router;
