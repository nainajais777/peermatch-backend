const jwt=require('jsonwebtoken');
const User=require('../model/db_schema');

const auth_verification=((req,res,next)=>
{
const token="xyz";
const isVerify=token === "xyz"
if(!isVerify)
{
    res.status(501).send("Exit!!admin unauthenticate");
}
else
    next();
});
const user_auth=(async (req,res,next)=>
{
const get_token=req.cookies.token;
const verify_jwt =await jwt.verify(get_token,"secret_key");
if(!verify_jwt)
{
    return res.status(401).send("User not match ");
}
else
{
const user=await User.findById(verify_jwt.userId);
  req.user=user;
next();
}
});
module.exports={user_auth};