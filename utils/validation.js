const validator_check = (req,res,next)=>{
    const allowed=[
   "FirstName",
   "LastName",
   "Gender",
   "age",
   "PhotoUrl",
   "Skills"
    ];
const keys=Object.keys(req.body);
const check=keys.every(key=>allowed.includes(key));
console.log(`check keys in validation ${check}`);
if(!check)
{
    throw("Invalid input");
}
next();
}
module.exports=validator_check;