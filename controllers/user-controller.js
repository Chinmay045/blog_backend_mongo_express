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

module.exports = getAllUsers;