const express=require('express');
const { auth } = require('../middlewares/auth');
const { getUserbyId, FollowUnfollowUser, logged_user, UploadProfilePic, getAllfollowers, searchUser } = require('../controllers/user');
const router=express.Router();


router.get('/profile/:id',auth,getUserbyId);
router.put('/follow/:id',auth,FollowUnfollowUser);
router.get('/loggedUser',auth,logged_user);
router.post('/uploadProfilepic',auth,UploadProfilePic);
router.get('/allfollower/:id',auth,getAllfollowers);
router.post('/serch-user',auth,searchUser);

module.exports=router;