const express = require('express')
const authRouter = express.Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')

authRouter.route("/signup")
.post((req, res, next) => {// I am now getting error, if username is taken
    User.findOne({username: req.body.username})
        .then(user => {
            if(user){
                res.status(403)
                return next(new Error("username taken"))
            } else if (!user){

                const newUser = new User(req.body)
                req.body.username.toLowerCase()
                newUser.save()
                    .then(user => {
        
                        const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
                            res.status(201).send({token, user: user.withoutPassword()})
                    })
                    .catch(err => next(err))
            }
        })
        .catch(err => next(err))
})

authRouter.route("/login")
.post((req, res, next) => {

    User.findOne({username: req.body.username.toLowerCase()})
        .then(user => {
            if(!user){
                res.status(403)
                return next(new Error("username incorrect"))
            }
            user.checkPassword(req.body.password, (err, isMatch) => {
                if(err){
                    res.status(403)
                    return next(new Error("password incorrect"))
                }
                if(!isMatch){
                    res.status(403)
                    return next(new Error("password does not match"))
                }
                const token = jwt.sign(user.withoutPassword(), process.env.SECRET)
                    res.status(200).send({token, user: user.withoutPassword()})
            })
        })
        .catch(err => next(err))
})

module.exports = authRouter