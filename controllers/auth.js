const User = require("../models/User");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
require('dotenv').config();


// register ----------------------------------------------------------------------
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password ) {
      return res.status(400).json({
        success: false,
        message: "please add all field",
      });
    }
    const user=await User.findOne({email});
    if(user){
        return res.status(400).json({
            success:false,
            message:'user is allready register || please login'
        })
    }
    if(password.length<6){
        return res.status(400).json({
            success:false,
            message:'too short password'
        })
    }
    const hassedPassword=await bcrypt.hash(password,10);
    const data=await User.create({name,email,password:hassedPassword});

    return res.status(201).json({
        success:true,
        message:'user register successfully',
        user:data
    })

  } catch (error) {
    return res.status(500).json({
        success:false,
        message:error.message
    })
  }
};


// login-----------------------------------------------------------------------
exports.Login=async(req,res)=>{
   try{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:'require All field'
        })
    }
    const user=await User.findOne({email});
    if(!user){
        return res.status(400).json({
            success:false,
            message:'Please Register first'
        })
    }
    if(bcrypt.compare(password,user.password)){
        const token=jwt.sign({_id:user._id},process.env.JWT_SECRETE);
        const newuser=user.toObject();
        newuser.token=token;
        newuser.password=undefined;
        return res.status(200).cookie('token',token,{
            expires:new Date(Date.now()+365*24*3600*1000),
            httpOnly:true,
            secure:true
        }).json({
            success:true,
            message:'user login Successfully',
            user:newuser,
            token:token
        })
    }
    else{
        return res.status(400).json({
            success:false,
            message:'Email or Password not match',
        })
    }
   }catch(error){
    return res.status(500).json({
        success:false,
        message:error.message
    })
   }

}