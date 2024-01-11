const express = require('express');
const BlogPost = require('../models/Blogs.js');
const getBlog = require('../controllers/blog-controller');
const blogRouter = express.Router();

blogRouter.get('/', getBlog.getAllBlog)
blogRouter.post('/add', getBlog.addBlog)
blogRouter.put('/update/:id', getBlog.update);
blogRouter.get('/:id', getBlog.getById);
blogRouter.delete('/:id', getBlog.deleteBlog);

module.exports = blogRouter;