const express=require('express');
const router=express.Router();
const connectdbb=require('../model/coneectiondb');
const User = require('../model/db_schema');

const {user_auth}=require('../middlewares/auth');

router.post('/requestconnection/:status/:userid',user_auth, async(req,res)=>
{
const fromuser=req.user._id;
const touser=req.params.userid; // postman--> (touserid)
const status=req.params.status;
console.log("from user",fromuser);
console.log("touser",touser);
console.log("status",status);

if (fromuser.toString() === touser.toString()) {
  return res.status(400).json({ error: "You cannot send a request to yourself" });
}
const allowedstatus=["interested","ignored"];
if(!allowedstatus.includes(status))
{
  return res.status(400).send("invalid status input");
}
const save_db=  new connectdbb(
    {
fromUser:fromuser,
toUser:touser,
status:status
    }
);

const existingRequest = await connectdbb.findOne({
  $or: [
    { fromUser: fromuser, toUser: touser },
    { fromUser: touser, toUser: fromuser }
  ]
});
if (existingRequest) {
  return res.status(400).json("Connection request already exists");
}

try
{
 await save_db.save();
 res.send("save successfully");
}
catch
{
console.log("error while saving");
}
});


router.post("/receiveconnection/:status/:userid",user_auth,async(req,res)=>
{
   const logged_user=req.user;
   const user_id=req.params.userid; //postman --> fromuser
   const status=req.params.status;
   const allowedstatus=['accepted','rejected'];
   if(!allowedstatus.includes(status))
   {
    return res.status(400).send("Status input invalid");
   }
   const receive= await connectdbb.findOne(
    {
     fromUser:user_id,
     toUser:req.user._id,
     status:"interested"
    }
   );
     if (!request) {
      return res.status(404).json({ error: "No pending request found from this user" });
    }
   receive.status=status;
   try
   {
  await receive.save();
    res.status(200).json({ message: "Connection request updated successfully", status: request.status });   }
   catch(err)
   {
 console.error(err);
        res.status(500).json({ error: "Server error", details: err.message });
   }

});
module.exports=router;
