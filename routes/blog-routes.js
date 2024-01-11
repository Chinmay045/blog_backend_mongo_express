const express = require('express');
const { getAllBlog, addBlog } = require('../controllers/blog-controller');


const blogRouter = express.Router();

blogRouter.get('/', getAllBlog)
blogRouter.post('/add', addBlog)
// blogRouter.put('/update/:id', getBlog.update);
// blogRouter.get('/:id', getBlog.getById);
// blogRouter.delete('/:id', getBlog.deleteBlog);

module.exports = blogRouter;