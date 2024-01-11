const { mongoose } = require('mongoose');
const BlogPost = require('../models/BlogPost.js');
const User = require('../models/User.js')

const getAllBlog = async (req, res, next) => {
    let blogs;
    try {
        blogs = await BlogPost.find();
    }
    catch (error) {
        return console.log(error);
    }
    if (!blogs) {
        return res.status(400).json({ message: "blog not found" })
    }
    res.status(200).json({ blogs })
}

const addBlog = async (req, res) => {
    const { title, description, image, userID } = req.body;
    //console.log(req.body);
    let existingUser;
    try {
        existingUser = await User.findById(userID);
    } catch (error) {
        return console.log(error)
    }
    if (!existingUser) {
        return res.status(404).json({ message: "could not find the user" })
    }
    //console.log(existingUser);


    const blog = new BlogPost({
        title,
        description,
        image,
        user: userID
    });
    //console.log(blog);
    try {
        const session = await mongoose.startSession();
        session.startTransaction();
        await blog.save({ session });
        existingUser.blogs.push(blog);
        await existingUser.save({ session })
        await session.commitTransaction();
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error })
    }
    return res.status(200).json({ blog });

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
        blog = await Blog.findByIdAndDelete(id).populate('user');
        await blog.user.blogs.pull(blog);
        await blog.user.save();
    } catch (error) {
        return console.log(error);
    }
    if (!blog) {
        res.status(400).json({ message: "could not find the blog" });
    }
    res.status(200).json({ message: "blog deleted" });
}

module.exports = { getAllBlog, addBlog, deleteBlog, getById, update };