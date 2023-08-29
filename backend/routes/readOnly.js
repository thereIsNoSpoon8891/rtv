const express = require('express')
const readOnlyRouter = express.Router()
const Issue = require('../models/issue')

readOnlyRouter.route("/")
.get((req, res, next) => {// get ALL issues

    Issue.find()
        .then(issues => res.status(200).send(issues))
        .catch(error => next(error))
})

module.exports = readOnlyRouter