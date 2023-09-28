const mongoose = require('mongoose')
const Schema = mongoose.Schema

const commentSchema = new Schema({// 
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

/*

 // trying to import and set as array FAILED, ERROR:
 TypeError: Invalid schema configuration: `model` is not a valid type within the array 
 `comments`.See https://bit.ly/mongoose-schematypes for a list of valid schema types.
/////////////////////////////////////////////////////////////////////////////////////////////////
if you want to import the comment schema:

const commentSchema = require('./comment')

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
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'commentSchema
    '}],
    voters: [String]
})
/////////////////////////////////////////////////////////////////////////////////////////////////////
*/

module.exports = mongoose.model('Issue', issueSchema)