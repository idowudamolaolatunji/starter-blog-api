const Blog = require("../model/blogModel");

exports.createPost = async function (req, res) {
	try {
		const createdPost = await Blog.create({
			author: req.body.author,
			date: req.body.date,
			content: req.body.content,
			title: req.body.title,
		});

		res.status(201).json({
			status: "success",
			message: "Post successfully uploaded...",
			data: {
				post: createdPost,
			},
		});

	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err.message,
		});
	}
};

exports.uploadImage = async function (req, res) {
	try {
		console.log(req.file)
        if(!req.file){
            return res.json({message:'No image was uploaded'})
        }

        const post = await Blog.findOne({id: req.params.id, author: req.user._id });
        const imageFile = `${post.title.split(' ').join('-').toLowerCase()}-${Date.now()}.jpeg`;

        await sharp(req.file.buffer).resize(750, 750).toFormat('jpeg').jpeg({ qualify:80 }).toFile(`public/assets/blogs${imageFile}`);

        post.mainImage = imageFile;
        await post.save({validateBeforeSave: false});

		res.status(200).json({
			status: "success",
			message: "Post Image uploaded...",
			data: {
				post: post,
			},
		});

	} catch (err) {
		res.status(400).json({
			status: "fail",
			message: err.message,
		});
	}
};


exports.getAllPosts = async function (req, res) {
	try {
		const posts = await Blog.find();

		res.status(200).json({
			status: "success",
			data: {
				posts: posts,
			},
		});

	} catch(err) {
		res.status(400).json({
			status: "fail",
			message: err.message,
		});
	}
};


exports.getSinglePosts = async function (req, res) {
	try {
		const post = await Blog.findById(req.params.id);

		res.status(200).json({
			status: "success",
			data: {
				post,
			},
		});

	} catch(err) {
		res.status(400).json({
			status: "fail",
			message: err.message,
		});
	}
};


exports.editPost = async function (req, res) {
	try {
		const updatedPost = await Blog.findByIdAndUpdate(req.params.id, req.body, { runValidators: true, new: true });;

		res.status(200).json({
			status: "success",
			message: "Post Edited!!",
			data: {
				post: updatedPost,
			},
		});

	} catch(err) {
		res.status(400).json({
			status: "fail",
			message: err.message,
		});
	}
};


exports.deletePost = async function (req, res) {
	try {
		await Blog.findByIdAndDelete(req.params.id);

		res.status(200).json({
			status: "success",
			message: "Post deleted!!"
		});

	} catch(err) {
		res.status(400).json({
			status: "fail",
			message: err.message,
		});
	}
};
