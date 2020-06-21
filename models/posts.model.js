const mongoose = require('mongoose');
// const User = require('./user.model');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    postTitle: {
        type: String,
        required: true,
        trim: true
    },
    postEndpoint: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    postContent: {type: [String], required: true},
    postLanguage: {type: String, default: 'English'},
    postDescription: {type: String, required: true}
    // author: {type: User.schema, required: true},
}, {
    timestamps: true
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;