const mongoose=require('mongoose');

const userschema=new mongoose.Schema({
        name:{
            type:String,
            require:true,
        },
        email:{
            type:String,
            require:true,
        },
        password:{
            type:String,
            require:true
        },
        posts:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Post'
        }],
        following:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }],
        followers:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'User'
        }],
        profilePic:{
            type:String,
            default:'https://img.freepik.com/premium-vector/man-avatar-profile-picture-vector-illustration_268834-538.jpg',
        }
        
});

const User=mongoose.model('User',userschema);
module.exports=User;