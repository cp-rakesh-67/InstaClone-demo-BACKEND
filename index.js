const express=require('express');
const app=express();
require('dotenv').config();
const dbconnect=require('./config/db');
const authRouter=require('./routes/auth')
const postRouter=require('./routes/post');
const userRouter=require('./routes/User');
const cookieParser=require('cookie-parser');
const cors=require('cors');
const cloudinaryConnect=require('./config/cloudynary')
const fileUpload=require('express-fileupload');


// middleWare
//------------------------------------------------------------------------------------
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}))
//mounting
// -----------------------------------------------------------------------------------
app.use('/api/v1/user',authRouter);
app.use('/api/v1/post',postRouter);
app.use('/api/v1/userP',userRouter);
//____________________________________________________________________________________
// -----------------------------------------------------------------------------------
dbconnect();
cloudinaryConnect();
const port=process.env.PORT || 3005;
app.listen(port,()=>{
    console.log(`server is running ${port}`);
})

app.get('/',(req,res)=>{
    return res.send(`welcome to instaclone app , your server run at ${port}`)
})

