const mongoose=require('mongoose');

const postSchema=new mongoose.Schema({
     title:{
        type:String,
        require:true
     },
     body:{
        type:String,
        require:true,
     },
     photo:{
        type:String,
        default:'No Photo'
     },
     posttedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
     },
     likes:[
      {
         type:mongoose.Schema.Types.ObjectId,
         ref:'User'
      }
     ],
     Comment:[{
        text:String,
        user:String,
        posttedBy:{
         type:mongoose.Schema.Types.ObjectId,
         ref:'User'
        }
     }]

},{timestamps:true});

const Post=mongoose.model('Post',postSchema);
module.exports=Post;