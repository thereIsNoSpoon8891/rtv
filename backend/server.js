const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
const { expressjwt } = require('express-jwt')
require('dotenv').config()
const app = express()


app.use(express.json())
app.use(morgan('dev'))

mongoose.connect(process.env.MONGO_URI)
    .then(res => console.log("Connected to Mongo DB"))
    .catch(err => console.log(err))


//Routes
app.use("/api", require('./routes/readOnly'))
app.use("/api/authenticate", require('./routes/authenticateRouter'))
app.use("/api/authenticate", expressjwt({secret: process.env.SECRET, algorithms:['HS256'] }))
app.use("/api/authenticate/issues", require('./routes/issueRouter'))

app.use((err, req, res, next) => {
    console.log(err)
    if(err.name === "UnauthorizedError"){
         res.status(err.status)
    }
    return res.send({errorMessage: err.message })
})

app.listen(9000, () => {
    console.log("Server Running on Port 9000")
})