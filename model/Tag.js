const mongoose = require('mongoose');

const TagSchema = new mongoose.Schema({
    name: String,
    color: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
    }
});

const Tag = mongoose.model('tags', TagSchema);

module.exports = Tag;
