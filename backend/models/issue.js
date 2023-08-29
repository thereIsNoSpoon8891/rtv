const mongoose = require('mongoose')
const Schema = mongoose.Schema


const commentSchema = new Schema({// QUESTION: as of now, Comment is defined in 2 places... It works
    comment: {
        type: String,
        required: true
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    issue: {
        type: Schema.Types.ObjectId,
        ref: "Issue",
        required: true
    }
})

const issueSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imagUrl: String,
    upvotes: {
        type: Number,
        default: 0
    },
    downvotes: {
        type: Number,
        default: 0
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    comments: {
        type:[commentSchema]
    },
    voters: [String]
})

module.exports = mongoose.model('Issue', issueSchema)