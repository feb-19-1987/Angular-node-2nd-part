const mongoose=require('mongoose');//require statement for mongoose.

var Employee=mongoose.model('Employee',{
  name:{type:String,required:true},
  position:{type:String},
  office:{type:String},      //SCHEMA
  salary:{type:Number}  
});//To create Employee model we are using the function mongoose.model()
//within it we have to specify the model name employee and have to define the schema inside it

module.exports={ Employee };
//module.exports={Employee}