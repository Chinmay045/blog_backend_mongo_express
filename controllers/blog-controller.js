const { default: mongoose } = require('mongoose');
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
    let existingUser;
    try {
        existingUser = await Blog.findById(user);
    } catch (error) {
        return console.log(error)
    }
    if (!existingUser) {
        res.status(404).json({ message: "could not find the user" })
    }

    const blog = new Blog({
        title,
        description,
        image,
        user
    });
    try {
        const session = mongoose.startSession();
        (await session).startTransaction();
        await blog.save({ session })
        existingUser.blogs.push(blog)
        await existingUser.save({ session })
            (await session).commitTransaction();

    }
    catch (error) {
        console.log(error);
        return res.status(404).json({ message: error })
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
    res.status(200).json({ blog });
}

const deleteBlog = async (req, res, next) => {
    const id = req.params.id;
    let blog;
    try {
        blog = await Blog.findByIdAndDelete(id);
    } catch (error) {
        return console.log(error);
    }
    if (!blog) {
        res.status(400).json({ message: "could not find the blog" });
    }
    res.status(200).json({ message: "blog deleted" });
}

module.exports = { getAllBlog, addBlog, update, getById, deleteBlog };