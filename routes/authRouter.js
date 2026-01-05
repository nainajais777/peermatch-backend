//authRouter.js
const express=require('express');
const auth_Router=express.Router();
const User=require('../model/db_schema');
const cookieParser = require("cookie-parser");
auth_Router.use(cookieParser());
const bcrypt=require('bcrypt');



auth_Router.post("/signup",async(req,res)=>
{
try{
    if(Object.keys(req.body).length==0)
    {
     return   res.status(400).send("Please provide all required information ");
    }
    else
    {
let password=req.body.Password;
const encrypted_pswd=await bcrypt.hash(password, 10);

    req.body.Password = encrypted_pswd;  
    const user=new User(req.body);
    await user.save();
    //res.send("data saved sucessfully router");
    res.status(201).json({ message: "User registered successfully", userId: user._id });

        
    }
}
catch(err)
{

    res.status(404).send({
        error:"Data Not send",
        details:err.message
    });
}
});
auth_Router.post("/login",async(req,res)=>
{
 const {emailId,Password}=req.body;
 const user=await User.findOne({emailId:emailId}) ;
 if(!user)
  return res.status(401).json({ error: "Invalid credentials" });
    const match=await user.get_pswd(req.body.Password);
       if (!match) {
      return res.status(401).json({ error: "Invalid credentials" });
    }
    const jwt_token=user.get_jwt();
    
        res.cookie("token",jwt_token);
       res.status(200).json({ message: "Login successful", userId: user._id });
});

auth_Router.post("/logout", (req, res) => {
  try 
  {
    res.clearCookie("token");
    return res.status(200).json({ message: "Logout successful" });
  }
   catch (err) 
   {
    return res.status(500).json({ error: "Internal server error", details: err.message });
  }
});
module.exports=auth_Router;