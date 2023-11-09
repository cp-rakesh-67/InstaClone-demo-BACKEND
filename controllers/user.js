const User=require('../models/User');
const cloudinary=require('cloudinary').v2;

// get loged_User

exports.logged_user=async(req,res)=>{
    try{
       if(req.user._id===null)
       {
        return res.status(400).json({
         success:false,
         messsage:'please sign in'
       })}
     
        const user=await User.findById(req.user._id);
        user.password=undefined;
        return res.status(200).json({
           success:true,
           user_name:user.name,
           user_id:user._id,
           user_profile:user.profilePic,
           followers:user.followers,
           following:user.following,
         })
    }catch(error){
      return res.status(500).json({
        success:true,
        message:error.message
      })
    }
      
}



// get User by Id
exports.getUserbyId=async(req,res)=>{
    try{
        
        const user=await User.findById(req.params.id).populate('posts').select('-password');
        return res.status(200).json({
            success:true,
            message:'user successfully fetch',
            user,
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }  

}


// Follow User

exports.FollowUnfollowUser=async(req,res)=>{
   try{
      const user=await User.findById(req.params.id);
      const Logged_user=await User.findById(req.user._id);
      if(user.followers.includes(Logged_user._id))
      {
        await user.followers.pull(Logged_user._id);
        user.save();
        await Logged_user.following.pull(user._id);
        Logged_user.save();
        return res.status(200).json({
            success:true,
            message:'unfollow successfully'
        })
      }
      await user.followers.push(Logged_user._id);
      user.save();
      await Logged_user.following.push(user._id);
      Logged_user.save();
      return res.status(200).json({
        success:true,
        message:'you are following '
      })

   }catch(error){
    return res.status(500).json({
        success:false,
        message:error.message,
    })
   }
}



// upload profilepic
exports.UploadProfilePic=async(req,res)=>{
  try{
     const user=await User.findById(req.user._id);
     const file=req.files.Profilepic;

     const uploadFile=async(file,folder)=>{
      const options={folder};
      options.resource_type="auto";
      return await cloudinary.uploader.upload(file.tempFilePath,options)
  }

    const data=await uploadFile(file,process.env.FOLDER);
    
    user.profilePic=data.secure_url;
    user.save();
    return res.status(200).json({
       success:true,
       message:'profile picture update successfully ! please reload the page !!',
       user,
    })

  }catch(error){
    return res.status(500).json({
      success:false,
      message:error.message,
    })
  }
}


// /get allFollowers one by one.
exports.getAllfollowers=async(req,res)=>{
   try{
    const user=await User.findOne({_id:req.params.id}).populate('followers');
    return res.status(200).json({
      success:true,
      all_followers:user.followers,
    })
   }catch(error){
    return res.status(500).json({
      success:false,
      message:error.massage
    })
   }
}


// searchin people controler

exports.searchUser=async(req,res)=>
{
  try{
  let userPattern=new RegExp("^"+req.body.query);
  const user =await User.find({name:{$regex:userPattern}});
  return res.status(200).json({
   user,
  })
  }catch(error){
    return res.status(500).json({
      message:error.massage
    })
  }
  
}