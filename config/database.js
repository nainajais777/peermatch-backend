const mongoose= require('mongoose');

const connectdb=(async ()=>
{
await mongoose.connect("mongodb+srv://Nodenaina:LrqOMZxnNsISJDKr@nodenaina.bmb7y.mongodb.net/PeerMatch ");
console.log("database connected");

});



 module.exports=connectdb;