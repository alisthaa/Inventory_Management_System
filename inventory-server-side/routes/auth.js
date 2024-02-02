const express = require("express")
const router = express.Router();
const auth = require("../controller/auth") // auth = login , signup
// object destructuring 
const {login, signup, products}= require("../controller/auth")

//login and signup
//export login and sign up
const UserModel= require("../model/User")

router.post('/api/signup', signup  )

router.post('/api/login', login )

  module.exports = router;

// router.post("")