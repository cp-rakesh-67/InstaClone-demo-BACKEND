const Post = require("../models/Post");
const User=require('../models/User');
const cloudinary=require('cloudinary').v2;
require('dotenv').config();

// create post--------------------------------------------------------
exports.CreatePost = async (req, res) => {
  try {
    const { title, body } = req.body;
    const file=req.files.photo;
    if (!title || !body) {
      return res.status(400).json({
        success: false,
        message: "title and body will be require",
      });
    }
    
    // upload photo to cloudinary ------------------------------------------
    const uploadFile=async(file,folder)=>{
        const options={folder};
        options.resource_type="auto";
        return await cloudinary.uploader.upload(file.tempFilePath,options)
    }

    const data=await uploadFile(file,process.env.FOLDER);

   


    const post=await Post.create({title,body,posttedBy:req.user._id,photo:data.secure_url});
    // const user=await User.findById(req.user._id);
    // user.posts.push(post._id);
    // user.save();

    const user=await User.findByIdAndUpdate({_id:req.user._id},{$push:{posts:post._id}},{new:true})
    return res.status(201).json({
        success:true,
        post:post,
        message:'post is created'
    })
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// get allpost -----------------------------------------------------------------
exports.getAllpost=async(req,res)=>{
    try{
      const post=await Post.find().populate('posttedBy').sort('-createdAt');
      return res.status(200).json({
        success:true,
        posts:post
      })
    }catch(error){
        return res.status(500).json({
            success:true,
            message:error.message
        })
    }
}

// getpostbysingleuser-------------------------------------------
exports.getpostByuser=async(req,res)=>{
    try{
         const user=await User.findById(req.user._id).populate('posts');
         const posts=user.posts;
         const newuser=user.name;
         return res.status(200).json({
            success:true,
            posts:posts,
            user:newuser
         })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

// like and unlink function.
exports.LikeAndUnlike=async(req,res)=>{
  try{
     const user=await User.findById(req.user._id);
    
     const post=await Post.findById(req.body.postId);
     if(post.likes.includes(req.user._id)){
     
      const unlike=await Post.findByIdAndUpdate({_id:req.body.postId},{$pull:{likes:req.user._id}},{new:true});
      return res.status(200).json({
        success:true,
        message:'post unlike',
        unlike:unlike,
      })}
      else{
        const like= await Post.findByIdAndUpdate({_id:req.body.postId},{$push:{likes:req.user._id}},{new:true});
        return res.status(200).json({
        success:true,
        message:'post Like successfully',
        like:like,
      })}

    }  
  catch(error){
    return res.status(400).json({
       success:false,
       message:error.message,
    })
  }

 }


//  Comments on a post function
exports.Comments=async(req,res)=>{
   try{
    const user=await User.findById(req.user._id);
    const comment={
       text:req.body.text,
       user:user.name,
       posttedBy:req.user._id,
    }
    
    const newComments=await Post.findByIdAndUpdate({_id:req.body.postId},{$push:{Comment:comment}},{new:true}).populate('Comment.posttedBy');

     return res.status(201).json({
      success:true,
      message:'comments created',
      newComments,
      user:user.name
     })
   }catch(error){
     return res.status(500).json({
       success:false,
       message:error.message,
     })
   }
}


// Delete post
exports.DeletePost=async(req,res)=>{
  try{
    const post=await Post.findById(req.params.postId);
    // const user=await User.findById(req.user._id);
    
    if(req.user._id.toString()===post.posttedBy.toString()){
      const data=await Post.findByIdAndDelete({_id:req.params.postId});
      const data2=await User.findByIdAndUpdate({_id:req.user._id},{$pull:{posts:req.params.postId}},{new:true});
      return res.status(200).json({
        success:true,
        message:'file delete successfully'
      })
    }
   else{
    return res.status(400).json({
      success:false,
      message:'unAthorize token'
    })
   }

  }catch(error){
      return res.status(500).json({
        success:true,
        message:error.message
      })
  }
    
}

// get all comments who comment on a post 
exports.getAllComments=async(req,res)=>{
    try{
      const postId=req.params.id;
      const post =await Post.findOne({_id:postId});
      return res.status(200).json({
        success:true,
        message:'all comment fetch',
        comment:post.Comment,
      })
    }catch(error){
        return res.status(200).json({
          success:false,
          message:error.message
        })
    }
      
}

// get all user who likes a post 
exports.getAllLikes=async(req,res)=>{
  try{
    const postId=req.params.id;
    const post =await Post.findOne({_id:postId}).populate('likes');
    return res.status(200).json({
      success:true,
      message:'all user who likes this post are fetch',
      likes:post.likes,
    })
  }catch(error){
      return res.status(200).json({
        success:false,
        message:error.message
      })
  }
    
}