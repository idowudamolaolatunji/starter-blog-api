const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
	author: {
		type: String,
		required: true,
	},
	title: {
        type: String,
        required: true
    },
    mainImage: String,
	content: {
        type: String,
        required: [true, "Blog must have a content"]
    },
	likes: Number,
    createdAt: {
        type: Date,
        default: Date.now 
    }
});

const Blog = mongoose.model("Blog", blogSchema);
module.exports = Blog;
