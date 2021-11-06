const mongoose = require('mongoose')

const Schema = mongoose.Schema;

const PostSchema = new Schema({

    content: { type: String, required: true, trim: true },
    postedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    pinned: Boolean
    
}, {timestamps: true})

var Post = mongoose.model('Post', PostSchema)

module.exports = Post;