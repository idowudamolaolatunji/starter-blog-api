const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true,'Email is required'],
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: [true,'Password is required'],
        min: 6,
    },
    phoneNumber: {
        type: Number,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    }
})

const User = mongoose.model('User',userSchema);
module.exports = User;