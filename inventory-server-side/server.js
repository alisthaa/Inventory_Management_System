const express = require('express')
const mongoose = require('mongoose')
const app = express()
const cors = require('cors')
const bcrypt = require("bcrypt")
const UserModel = require("./model/User.js")
const ProductModel= require("./model/products.js")
const authRoutes =  require("./routes/auth.js")
const productRoutes =  require("./routes/products.js")
const handleServer= require("./middleware/handleServer.js")
const fileUpload = require('express-fileupload')
mongoose.connect('mongodb://127.0.0.1:27017/inventory')
  .then(() => console.log('Connected!'));
app.use(cors())
app.use(fileUpload()) 
app.use(express.json()) // runs for each request
app.use('/uploads', express.static('uploads'))
app.use(authRoutes)
app.use(productRoutes)
app.use(handleServer)

app.listen(3000, () => {
  console.log("started")
})