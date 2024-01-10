const User = require('../models/User.js');

const getAllUsers = async (req, res, next) => {
    let users;
    try {
        users = await User.find({})
    } catch (error) {
        console.log(error);

    } if (!users) {
        return users.status(404).json({ message: "no users found" })
    }
    return res.status(200).json({ users });
}

const signUp = async (req, res, next) => {
    const { username, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });
    } catch (error) {
        console.log("error occured" + error);
    }
    if (existingUser) {
        return res.status(400).json({ message: "user already exists" });
    }

    const user = new User({
        name,
        email,
        password
    })
    try {
        user.save();
    } catch (error) {
        console.log(error);
    }
    return res.status(201).json({ user });

}

module.exports = { getAllUsers, signUp };