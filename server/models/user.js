const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        default: null
    },
    lastname: {
        type: String,
        required: true,
        default: null
    },
    username: {
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        index: { unique: true }
    },
    login: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        default: 'member'
    },
    password: {
        type: String
    }
}, { timestamps: true });


// UserSchema.plugin(uniqueValidator);

module.exports = mongoose.model('users', UserSchema);