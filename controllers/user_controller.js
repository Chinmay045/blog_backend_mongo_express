const User = require('../models/user.js')
const bcrypt = require('bcryptjs')

const getAllUsers = async (req, res) => {
    let users;
    try {
        users = await User.findAllUsers();
    } catch (error) {
        console.log(error);

    } if (!users) {
        return users.status(404).json({ message: "no users found" })
    }
    return res.status(200).json({ users: users[0] });
}

const signUp = async (req, res) => {
    const { name, email, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findByEmail(email);
    } catch (error) {
        console.log("error occured" + error);
    }

    if (existingUser.length !== 0) {
        return res.status(400).json({ message: "user already exists" });
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = new User(name, email, hashedPassword);
    try {
        await user.save();
    } catch (error) {
        return console.log(error);
    }
    return res.status(201).json({ user });

}

const login = async (req, res) => {
    const { email, password } = req.body;

    let existingUser;
    try {
        [existingUser] = await User.findByEmail(email);
    } catch (error) {
        console.log("error occured" + error);
    }
    console.log(existingUser);
    if (existingUser.length === 0) {
        return res.status(400).json({ message: "user does not exists" });
    }
    console.log(password)
    const isPasswordCorrect = bcrypt.compareSync(password, existingUser['PASSWORD']);
    if (!isPasswordCorrect) {
        return res
            .status(404)
            .json({ message: "incorrect password" });
    }
    return res.status(200).json({ message: "login successfull" });
}


module.exports = { getAllUsers, signUp, login };


