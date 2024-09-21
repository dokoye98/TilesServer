const express = require('express')
const app = express()
const cors = require('cors')
const {restart} = require('nodemon')
const dotenv = require('dotenv')
const mailRouter = require('./routes/mailer')
dotenv.config()
app.use(cors())
app.use(express.json())
app.use('/builder',mailRouter)



const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log("builders is running on",PORT)
})