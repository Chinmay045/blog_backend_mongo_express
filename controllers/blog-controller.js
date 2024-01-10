const Blog = require('../models/Blogs.js');


const getAllBlog = async (req, res, next) => {
    let blogs;
    try {
        blogs = await Blog.find()
    }
    catch (error) {
        return console.log(error);
    }
    if (!blogs) {
        return res.status(400).json({ message: "blog not found" })
    }
    res.status(200).json({ blogs })
}

module.exports = getAllBlog;