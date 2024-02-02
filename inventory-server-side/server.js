const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const bcrypt = require("bcrypt")
const UserModel = require("./model/User.js")
const authRoutes =  require("./routes/auth.js")
const handleServer= require("./middleware/handleServer.js")
mongoose.connect('mongodb://127.0.0.1:27017/project')
  .then(() => console.log('Connected!'));
app.use(cors())
app.use(express.json()) // runs for each request
app.use(authRoutes)
app.use(handleServer)

app.listen(3000, () => {
  console.log("started")
})