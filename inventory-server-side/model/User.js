const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const UserSchema = new Schema({
  name: {
    required: true,
    type : String,
    minLength : "3"
  },
  email :{
    required : true,
    type: String,
// custom validataion
 validate:{
  validator :  async function(requestValue){
let user = await mongoose.models.User.findOne({ email: requestValue})
if(user){
return false
}
return true
  },
  message: "Email already used"
 }

  },
  password: {
    required : true,
    type: String,
    
  }
});

const UserModel = mongoose.model("User",UserSchema)

module.exports = UserModel
