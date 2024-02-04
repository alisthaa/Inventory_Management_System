const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const ProductSchema = new Schema({
  title: {
    type : String,       // database validation
    required: true
  },
  price: {
    type: Number,
    min: 0,
    default: 0
},
quantity:{
type: Number,
},
  description :{
    type: String,
    minLength: 255
  },
  category :{
    type: String,
  },
  createdBy:{
    required: true,
    type: ObjectId,
    ref: "User"
  },
  image:{
    type: String, // we save image in soe directory and only save images path
  }
},
{
timestamps: true}
);

const ProductModel = mongoose.model("Product",ProductSchema)

module.exports = ProductModel;
