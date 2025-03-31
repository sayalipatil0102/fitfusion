const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,  // Optional: If you're storing an image URL
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
