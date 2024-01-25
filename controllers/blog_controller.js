const Blog = require('../models/blog.js');
const User = require('../models/user.js')


const getAllBlog = async (req, res) => {
    let blogs;
    try {
        blogs = await Blog.findAllBlog();
    }
    catch (error) {
        return console.log(error);
    }
    if (!blogs) {
        return res.status(400).json({ message: "blog not found" })
    }
    res.status(200).json({ blogs: blogs[0] })


}

const addBlog = async (req, res) => {
    const { title, description, image, userID } = req.body;
    //console.log(req.body);

    let existingUser;
    try {
        existingUser = await User.findByID(userID);
    } catch (error) {
        return console.log(error)
    }

    //console.log(existingUser);

    if (!existingUser) {
        return res.status(404).json({ message: "could not find the user" })
    }


    const blog = new Blog(title, description, image, existingUser['USER_ID']);
    try {
        let rs = await blog.save();
        console.log(rs);
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: error })
    }
    return res.status(200).json({ message: "Blog got inserted" });

}

const updateBlog = async (req, res) => {
    const { title, description } = req.body;
    console.log(req.body);
    const blogId = req.params.id;
    console.log(blogId)
    let blog;
    try {
        blog = await Blog.findByIdAndUpdate(blogId, title, description)
        console.log(blog);
    } catch (err) {
        return console.log(err);
    }
    if (!blog) {
        return res.status(500).json({ message: "unable to find the blog" });
    }
    return res.status(200).json({ blog })
}


const getById = async (req, res) => {
    let id = req.params.id;
    let blogId;
    try {

        blogId = await Blog.findBlogById(id);
    }
    catch (err) {
        console.log(err)
    }
    if (!blogId) {
        res.status(400).json({ message: "unable to find blog" });
    }
    res.status(200).json({ blogId: blogId[0] });
}

const deleteBlog = async (req, res) => {
    let id = req.params.id;
    let blogId;
    try {

        blogId = await Blog.deleteBlogById(id);
    }
    catch (err) {
        console.log(err)
    }
    if (!blogId) {
        res.status(400).json({ message: "unable to find blog" });
    }
    res.status(200).json({ message: "blog deleted" });
}

module.exports = { getAllBlog, addBlog, updateBlog, getById,deleteBlog }