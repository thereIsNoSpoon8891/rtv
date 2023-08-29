const express = require('express')
const issueRouter = express.Router()
const jwt = require('jsonwebtoken')
const Issue = require('../models/issue')
const Comment = require('../models/comment')

issueRouter.route("/")
.post((req, res, next) => {//add new Issue

    req.body.user = req.auth._id
    
        const newIssue = new Issue(req.body)
            newIssue.save()
                .then(issue => res.status(201).send(issue))
                .catch(error => next(error))
})

issueRouter.route("/user")// bug solved, concrete routes must be BEFORE parameterized routes!
.get((req, res, next) => {
    console.log(req.body)
    Issue.find({user: req.auth._id})
        .then(issues => res.status(200).send(issues))
        .catch(err => next(err))
})

issueRouter.route("/:id")// add comment to issue
.post((req, res, next) => {

    req.body.user = req.auth._id// add user ID to body
    req.body.issue = req.params.id// add Issue ID to body
    const newComment = new Comment(req.body)// add new comment
        newComment.save()
            .then(savedComment => {
                Issue.findById(req.params.id)// find the issue by params
                .then(issue => {// returns the issue
                    issue.comments.push(savedComment)// push the new comment into issues comment array
                        issue.save()// save the issue with the new comment
                            .then(result => res.status(201).send(result))
                            .catch(err => next(err))
                })
                    .catch(err => next(err))
            }) 
            .catch(err => next(err))
})
.delete((req, res, next) => {// delete Issue

    Issue.findByIdAndDelete({_id: req.params.id, user: req.auth._id})
        .then(issue => res.status(200).send({deleted: issue}))
        .catch(err => next(err))
})
.put((req, res, next) => {// update Issue

    Issue.findByIdAndUpdate({_id: req.params.id, user: req.auth._id}, req.body)
        .then(updatedIssue => res.status(201).send(updatedIssue))
        .catch(err => next(err))
})
.get((req, res, next) => {// get ONE Issue
    Issue.findById(req.params.id)
        .then(issue => res.status(200).send(issue))
        .catch(err => next(err))
})

issueRouter.route("/upvote/:issueId")// update, add upvote by 1
.put((req, res, next) => {
    Issue.updateOne(
        {_id: req.params.issueId,
        voters: {$ne: req.auth._id}},
        {$inc: {upvotes: 1},
        $addToSet: {voters: req.auth._id}
        })
        .then(updatedIssue => res.status(201).send(updatedIssue))
        .catch(err => next(err))
})

issueRouter.route("/downvote/:issueId")// update, add downvote by 1
.put((req, res, next) => {
    Issue.updateOne(
        {_id: req.params.issueId,
        voters:{$ne: req.auth._id}}, //only allows operation if user id is NOT present
        {$inc: {downvotes: 1},
         $addToSet:{voters: req.auth._id}})
        .then(updatedIssue => res.status(201).send(updatedIssue))
        .catch(err => next(err))
})



module.exports = issueRouter