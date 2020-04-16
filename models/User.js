const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String
    },
    data: {
        type: Date,
        default: Date.now
    }
});

// Avatar basically allows you to attach a profile image to your email

// model name is 'user', use the schema called UserSchema
module.exports = User = mongoose.model('user', UserSchema);