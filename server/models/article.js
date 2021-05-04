const mongoose = require('mongoose');
// const AppConstants = require('./../settings/constants');
// const { UsersRoleSettings } = require('./../settings/settings');
require('./user');
require('./category');

const ArticleSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: null
    },
    content: {
        text: { type: String },
        image: [{ type: String }]
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    CategoryId: {
        type: mongoose.Types.ObjectId,
        ref: 'categories',
        required: true,
        default: null
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'users',
        required: true,
        default: null
    }
},
{ timestamps: true }
);

module.exports = mongoose.model('articles', ArticleSchema);