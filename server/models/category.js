const mongoose = require('mongoose');
require('./user');

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        default: null
    },
    description: {
        type: String,
        required: true,
        default: null
    },
    user_id: {
        type: mongoose.Types.ObjectId,
        ref: 'users'
    }
});



module.exports = mongoose.model('categories', CategorySchema);