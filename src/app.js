const express = require("express");
const app=express();
const validator_check=require('../utils/validation');
const connect=require('../config/database');
const User=require('../model/db_schema');
const cookieParser = require("cookie-parser");
app.use(express.json());
app.use(cookieParser());

//router
const auth_Router=require("../routes/authRouter");
const public_Router=require("../routes/publicRouter");
const user_Router=require("../routes/userRouter");
const req_Router=require("../routes/requestRouter");


app.use("/auth",auth_Router);
app.use("/profile",public_Router);
app.use("/user",user_Router);
app.use("/request",req_Router);


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


