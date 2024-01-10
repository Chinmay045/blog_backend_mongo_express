const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    password: {
        require: true,
        type: String,
        minlength: 6,
    }
})

const User = mongoose.model('User', userSchema);

module.exports = User;