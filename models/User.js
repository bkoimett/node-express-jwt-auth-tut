const mongoose = require("mongoose");
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'Please enter an email address'],
        unique: true,
        lowercase: true, // for storage purposes
        validate: [isEmail, 'Please enter a valid email']
    },
    password: {
        type: String,
        required:[true, 'Please enter a password'],
        minlength:[6, 'Minimum password length is 6 characters']
    },
});

// fire a function after doc saved to db
userSchema.post('save', function (doc, next) {
    console.log('new user was creatd and saved', doc);
    next();
});

// fire a function before doc saved to db
userSchema.pre('save', function (next) {
    console.log('new user is about to be created and saved', this ); // this is the local user instance
    next();
})

const User = mongoose.model('user', userSchema);

module.exports = User;