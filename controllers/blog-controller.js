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

const addBlog = async (req, res, next) => {
    const { title, description, image, user } = req.body;

    const blog = new Blog({
        title,
        description,
        image,
        user
    });
    try {
        await blog.save();
    }
    catch (error) {
        return console.log(error);
    }
    res.status(200).json({ blog });
}

const update = async (req, res, next) => {
    const { title, description } = req.body;
    const blogId = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, {
            title,
            description
        });
    }
    catch (error) {
        return console.log("error occured" + error)
    }
    if (!blog) {
        res.status(500).json({ message: "unable to update the blog" });
    }
    res.status(200).json({ blog });

}

const getById = async (req, res, next) => {
    let blog;
    const id = req.params.id;
    try {

        blog = await Blog.findById(id);
    }
    catch (error) {
        return console.log(error);
    }
    if (!blog) {
        res.status(404).json({ message: "cannot find the blog by id" });
    }
    res.status(200).json({ blog});
}

module.exports = { getAllBlog, addBlog, update, getById };