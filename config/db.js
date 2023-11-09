const mongoose=require('mongoose');

const dbconnect=()=>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true
    }).then(()=>{console.log('dbconnected is running SuccessFully')}).catch((error)=>{
        console.log(error);
        process.exit(1);
    })
}

module.exports=dbconnect;