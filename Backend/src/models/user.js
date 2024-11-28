const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstname: String,
    lastname: String,
    username: String,
    email: String,
    password: String,
    isVerified: { type: Boolean, default: false },
    role: String,
});

const User = mongoose.model('users', userSchema);

module.exports = User;
