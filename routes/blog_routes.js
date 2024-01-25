const express = require('express');
const blogRouter = express.Router();
const { getAllBlog, addBlog, updateBlog, getById, deleteBlog } = require('../controllers/blog_controller.js');

blogRouter.get('/', getAllBlog);
blogRouter.post('/add', addBlog);
blogRouter.put('/update/:id', updateBlog)
blogRouter.get('/:id', getById)
blogRouter.delete('/:id', deleteBlog);

module.exports = blogRouter;