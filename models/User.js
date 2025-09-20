const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // for storage purposes
    },
    password: {
        type: String,
        required: true,
        maxlength:4
    },
});

const User = mongoose.model('user', userSchema);

model.exports = User;