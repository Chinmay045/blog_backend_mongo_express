const express = require('express');
const BlogPost = require('../models/Blogs.js');
const getBlog = require('../controllers/blog-controller');
const blogRouter = express.Router();

blogRouter.get('/', getBlog.getAllBlog)
blogRouter.post('/add', getBlog.addBlog)
blogRouter.put('/update/:id', getBlog.update);

module.exports = blogRouter;