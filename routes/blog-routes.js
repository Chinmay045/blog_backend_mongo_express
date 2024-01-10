const express = require('express');
const BlogPost = require('../models/Blogs');
const getAllBlog = require('../controllers/blog-controller');
const blogRouter = express.Router();

blogRouter.get('/', getAllBlog)

module.exports = blogRouter;