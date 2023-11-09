const jwt=require('jsonwebtoken');
require('dotenv').config();

exports.auth=async(req,res,next)=>{
        const {authorization}=req.headers;
        if(!authorization){
            return res.status(400).json({
                success:false,
                message:'Unautharized token'
            })
        }
        const token =authorization.replace("Bearer ","");
        const decode=jwt.verify(token,process.env.JWT_SECRETE);
        req.user=decode;
        next();
}