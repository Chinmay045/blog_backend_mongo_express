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
    })
    try {
        await user.save();
    } catch (error) {
        return console.log(error);
    }
    return res.status(201).json({ user });

}

module.exports = { getAllUsers, signUp };