const UserModel = require("../model/User")
const bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken');
const Joi = require('joi');
const handleServer = require('../middleware/handleServer');
const signupSchema = Joi.object({
  name: Joi.string()
      .alphanum()
      .min(3)
      .max(30)
      .required(),
  password: Joi.string()
      .alphanum()
      .min(8)
      .max(30)
      .required(),
  email: Joi.string()
      .email()
      .required(),
})
const signup= async function (req, res, next) {
    console.log("req.body", req.body);
    try{
      const { error: err } = signupSchema.validate(req.body, { abortEarly: false, stripUnknown: true });

      if (err) {
          let errors = err.details.map(el => {
              return {
                  message: el.message,
                  field: el.context.key
              }
          })

          console.log(err.message) // ValidationError
          if (err.name === "ValidationError") {
              return res.status(400).send({
                  msg: "Bad Request",
                  errors: errors
              })
          }
      }
    let hashedPassword = await bcrypt.hash(req.body.password, 10);
    let user = await UserModel.create({
      name: req.body.name,
      email:req.body.email,
      password: hashedPassword
    })
    //link mongoose model
    res.send(user)
  }
  catch(err){
    next(err)
  }
  }

  const loginSchema = Joi.object({
    password: Joi.string()
        .alphanum()
        .min(8)
        .max(30)
        .required(),
    email: Joi.string()
        .email()
        .required(),
})

  const login = async function (req, res) {
    console.log("req.body", req.body);

   //let hashedPassword =await bcrypt.compare(req.body.password, hash, function(err, result) {
      // result == true
  //});
   // let hashedPassword = await bcrypt.hash(req.body.password, 10);

    try{ 
      // check if email exist in database
      // compare hashed password 
      const { error: err } = loginSchema.validate(req.body, { abortEarly: false, stripUnknown: true });

      if (err) {
          let errors = err.details.map(el => {
              return {
                  message: el.message,
                  field: el.context.key
              }
          })

          console.log(err.message) // ValidationError
          if (err.name === "ValidationError") {
              return res.status(400).send({
                  msg: "Bad Request",
                  errors: errors
              })
          }
      }


    let user = await UserModel.findOne({email:req.body.email}).select("+password")
    //link mongoose model
console.log(user);
if(user){
user = user.toObject()


let hashedPassword= user.password
delete user.password;
let matched = await bcrypt.compare(req.body.password,hashedPassword );

const SECRET_KEY = 'shhhhh'
var token = jwt.sign(user,SECRET_KEY);

if (matched){
return res.send({
user: user,
  token: token
})
} 
}
    return res.status(401).send("invalid credentials")
}
  catch(err){
    next(err)
  }
  }
  module.exports = { 
    "login": login,
    "signup": signup,
  }
