const User = require('../models/User.js');
const bcrypt = require('bcrypt');

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
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email });

    } catch (error) {
        console.log("error occured" + error);
    }
    if (existingUser) {
        return res.status(400).json({ message: "user already exists" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new User({
        name,
        email,
        password: hashedPassword,
        blogs: []
    })
    try {
        await user.save();
    } catch (error) {
        return console.log(error);
    }
    return res.status(201).json({ user });

}

const login = async (req, res, next) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({ email });

    } catch (error) {
        console.log("error occured" + error);
    }
    if (!existingUser) {
        return res.status(400).json({ message: "user does not exist" });
    }

    const ispasswordCorrect = bcrypt.compareSync(password, existingUser.password);
    if (!ispasswordCorrect) {
        return res.status(400).json({ message: "incorrect password" });
    }
    return res.status(200).json({ message: "Login successful", user: existingUser })
}

module.exports = { getAllUsers, signUp, login };