const { Schema, model } = require('mongoose');

const UserSchema = new Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isApplicant: { 
        type: Boolean,
        default: false,
    },
});

const User = model("User", UserSchema);

module.exports = User;