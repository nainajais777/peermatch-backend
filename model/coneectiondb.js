const mongoose=require('mongoose');

const schema= new mongoose.Schema({

    fromUser:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user_info",
        required:true
    },
    toUser:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref:"user_info",
        required:true
    },
    status:
    {
        type:String,
        enum:['interested','rejected','ignored','accepted'],
        default:"pending"
    }
});
const connect=mongoose.model('Newconnect',schema);
module.exports=connect;