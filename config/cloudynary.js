const cloudinary=require('cloudinary').v2;
require('dotenv').config();

const cloudinaryConnect=()=>{
    try{
        cloudinary.config({ 
            cloud_name:process.env.Cloud_Name, 
            api_key:process.env.API_Key , 
            api_secret:process.env.API_Secret  
          });

    }catch(error){
        console.log(error)
    }
}

module.exports=cloudinaryConnect;