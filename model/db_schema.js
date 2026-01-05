
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const user_schema= new mongoose.Schema(
{
 FirstName :
 {
  type:String,
  required:[true,'Name is required'],
  minLength:[3,'First name must be at least 3 characters long'],
  maxLength:[20,'First name cannot exceed 20 characters'],
  trim:true
 },
 LastName :
 {
  type:String,
  required:[true,'Lastname is required'],
  trim:true
 },
 emailId:
 {
  type:String,  
  required:[true,'EmailId is required'],
  unique:true,
  validate:[validator.isEmail,'Invalid email format']
 },
 Password:
 {
   type:String,
   required:[true,'Password is required'],

 },
 Gender :
 {
  type:String,
  required:[true,'Gender is required'],
  validate:{
  validator :function(val)
  {
return['Male','Female','Others'].includes(val)
  },
message:'Invalid Gender'
 }
},
 age:
 {
    type:Number,
     required:[true,'Age is required'],
     min:[18,'Age must be atleast 18'],
     max:[60,'Age cannot exceed 60 years']
 },
 PhotoUrl :
 {
    type:String,
    default:'https://example.com/default-photo.png',
  
validate: { 
  validator: value => validator.isURL(value, { protocols: ['http','https','ftp'], require_tld: true, require_protocol: true }),
  message: 'Must be a Valid URL' 
}

 },
 Skills:
 {
  type:[String],

 },
},
{
timestamps:true,
}
);
user_schema.methods.get_jwt =function()
{
  const user=this;
  const sign_in=jwt.sign({userId:user._id},"secret_key", { expiresIn: "1h" });
  return sign_in;
};

user_schema.methods.get_pswd=async function(Password_input)
{
const user=this;  
const pswd=await bcrypt.compare(Password_input,user.Password);
return pswd;
};
const User= new mongoose.model('user_info',user_schema);
module.exports=User;