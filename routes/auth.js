const express=require('express');
const { register, Login } = require('../controllers/auth');
const { auth } = require('../middlewares/auth');
const router=express.Router();


router.post('/auth/register',register);
router.post('/auth/login',Login);
router.get('/hi',auth,(req,res)=>{
    res.json({
        user_id:req.user
    });
})

module.exports=router;