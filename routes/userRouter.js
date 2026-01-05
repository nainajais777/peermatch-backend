//userRouter.js
const express=require('express');
const req_Router=express.Router();
const {user_auth}=require('../middlewares/auth');
const connectdb=require('../model/coneectiondb');
const User = require('../model/db_schema');

req_Router.get("/connections/requests",user_auth,async(req,res)=>
{
const logged_in_user=req.user;
const exist=await connectdb.findOne(
  {
   toUser:logged_in_user._id,
   status:'interested' 
  }
);
if(exist)
{
  console.log("there users interested");

  }  else{
  console.log("no users");
  }
const user_db=await connectdb.find(
  {
   toUser:logged_in_user._id,
   status:'interested'
  }
).populate("fromUser");
  res.send({
    message: "Profile data",
   loggedin: user_db
  });

});


req_Router.get("/user_connections",user_auth,async(req,res)=>
{
  const logged_in_user=req.user._id;

  const connection_req= await connectdb.find({
    $or:
    [{
     toUser:logged_in_user,status:"accepted"
    },
    {
     fromUser:logged_in_user,status:"accepted"      
    }
    ]
  }).populate("fromUser")
    .populate("toUser");

res.send(connection_req);
});

req_Router.get("/feed",user_auth,async(req,res)=>
{
  const logged_in_user=req.user;
const page= req.query.page || 1;
const limit=req.query.limit || 3;
const skip=(page-1)*limit;
 const request= await connectdb.find({
     $or:
     [
      {
        fromUser:logged_in_user._id
      },
      {
        toUser:logged_in_user._id ,
      }
     ]
 }).populate("fromUser")
    .populate("toUser");

 const hideuserfromfeed=new Set();
 request.forEach((connection)=> 
   {
    hideuserfromfeed.add(connection.fromUser);
    hideuserfromfeed.add(connection.toUser);
   }
  )  ;
  console.log("hideuserfromfeed",hideuserfromfeed);

const users=await User.find(
  {
     $and:[
         {
        _id:{
             $nin:Array.from(hideuserfromfeed)
            }
          },
            {
              _id:
                 {
                $ne:logged_in_user._id
                 }
            },
     ],    
  }
).skip(skip)
.limit(limit)
//res.send(request);
res.send(users);
});

module.exports=req_Router;