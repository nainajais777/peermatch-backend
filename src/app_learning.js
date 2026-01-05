const express = require("express");
const app=express();
const bcrypt=require('bcrypt');
//const admin_auth=require('../middlewares/auth');
const {user_auth}=require('../middlewares/auth');

const connect=require('../config/database');
const User=require('../model/db_schema');
const cookieParser = require("cookie-parser");
//connect();
//console.log(typeof connect);
app.use(express.json());
app.use(cookieParser());
//app.use("/admin",admin_auth);
app.use("/admin",user_auth);

app.get("/admin/getalluser",(req,res)=>
{

res.send("all user information got successfully");
}
);
/*app.post("/user_info",async(req,res)=>
{
const user= new User({
FirstName:"lata",
LastName:"Pal",
Gender:"female",
age:32
}    
)
try{
await user.save();
res.send("information saved successfully");
}

catch(err)
{

    res.status.send("Data not save succcesfully");
}
});
*/

app.post("/signup",async(req,res)=>
{
try{
    if(Object.keys(req.body).length==0)
    {
     return   res.status(404).send("Please pprovide data ");
    }
    else
    {
let password=req.body.Password;
const encrypted_pswd=await bcrypt.hash(password, 10);

    req.body.Password = encrypted_pswd;  
    const user=new User(req.body);
    await user.save();
    res.send("data saved sucessfully");
        
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
app.post("/login",async(req,res)=>
{
 //const emailId= req.body.emailId;
 //const Password=req.body.Password;
 const {emailId,Password}=req.body;
 //res.cookie('cookie_token',"naina");
const user=await User.findOne({emailId:emailId}) ;
 if(emailId != user.emailId)
    return res.status(404).send("Invalid credential/email not match") ;
 else
 {
    //const match=await bcrypt.compare(Password,user.Password);
    const match=await user.get_pswd(req.body.Password);
    //const jwt_token= jwt.sign({userId:user._id},'secret_key');
    const jwt_token=user.get_jwt();
    if(match)
    {
        res.cookie("token",jwt_token);
        res.send("login success");
    }
 }
});
app.get("/profile",user_auth,async(req,res)=>
{
/*const get_token=req.cookies.token;
const verify_jwt=await jwt.verify(get_token,'secret_key');
 if(!get_token)
 {
    return res.status(401).send("No token");
 }
 else
 {
  
  console.log("get_token",get_token);
  console.log(verify_jwt.userId);  

  const user=await User.findById(verify_jwt.userId);
*/
const user=req.user;
  res.send({
    message: "Profile data",
    userId: req.userId,
    user_detail:user
  });

 //}

});
app.patch("/update",async(req,res)=>{
const user_input=req.body.userId;
const data=req.body;
try
{
await User.findByIdAndUpdate({_id:user_input},data);
res.send("Updated successfully");
}
catch(err)
{

    res.status(404).send("Data not save succcesfully");
}
});

app.get("/view",async(req,res)=>
{
    try
    {
  //const user = req.body.user_id;
  const verify= await User.find({});
  res.send(verify);
    }
 catch(err)
{

    res.status(404).send("Data not save succcesfully");
}   
});

app.post("/delete",async(req,res)=>
{
  const del_id = req.body.user_id;

    try
    {
  await User.findByIdAndDelete({_id:del_id});
  res.send("deleted successfully");
    }
 catch(err)
{

    res.status(404).send("Data not deleted");
}   
});

  (async()=>{
    try
    {
        await connect();
app.listen(2001,()=>{
    console.log("server working properly");
});
}
catch(err)
{
    //res.status(401).send("database conection failed");
        console.log("server not working properly");

}
})();
