
const express = require('express');

const blogController = require('../controller/blogController.js');
const { protectedRoute } = require('../middlewares/protectedRoute.js');
const { uploadToServer } = require("../middlewares/multer");

const router = express.Router();

router.get('/', blogController.getAllPosts);
router.get('/:id', blogController.getSinglePosts);

router.post('/', protectedRoute,  blogController.createPost);
router.patch('/:id', protectedRoute,  blogController.editPost);
router.delete('/:id', protectedRoute,  blogController.deletePost);

router.patch('/upload-img/:id', protectedRoute, uploadToServer, blogController.uploadImage);

module.exports = router; 