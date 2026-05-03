//publicRouter.js
const express=require('express');
const public_Router=express.Router();
const {user_auth}=require('../middlewares/auth');
const validator_check=require('../utils/validation');

public_Router.get("/view",user_auth,async(req,res)=>
{
  try{
const user=req.user;
   res.status(200).json({
      message: "Profile data retrieved successfully",
      user: {
        id: user._id,
        firstName: user.FirstName,
        lastName: user.LastName,
        emailId: user.emailId,
        gender: user.Gender,
        age: user.age,
        PhotoUrl: user.PhotoUrl,
        skills: user.Skills
      }
})
  }
catch (err) {
    res.status(500).json({ error: "Failed to retrieve profile", details: err.message });
  }
});
console.log("validator_check:", validator_check);

public_Router.patch("/edit",user_auth,validator_check,async(req,res)=>{
try
{
const logic= Object.keys(req.body).forEach(key=>req.user[key]=req.body[key]);
await req.user.save();
res.status(200).json({ message: "Profile updated successfully", user: req.user });
}
catch(err)
{
        res.status(500).json({ error: "Failed to update profile", details: err.message });
}
});

module.exports=public_Router;