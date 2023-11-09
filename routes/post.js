const express=require('express');
const { auth } = require('../middlewares/auth');
const { CreatePost, getAllpost, getpostByuser, LikeAndUnlike, Comments, DeletePost, getAllComments, getAllLikes } = require('../controllers/Post');
const router=express.Router();

router.post('/createpost',auth,CreatePost);
router.get('/get-allpost',auth,getAllpost);
router.get('/mypost',auth,getpostByuser);
router.put('/like-unlike',auth,LikeAndUnlike)
router.put('/comments',auth,Comments);
router.delete('/delete/:postId',auth,DeletePost);
router.get('/getAllcomment/:id',auth,getAllComments);
router.get('/getAlllikes/:id',auth,getAllLikes);
module.exports=router;