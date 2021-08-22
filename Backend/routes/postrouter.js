const router= require('express').Router();
const postController = require('../controllers/postController');
const auth= require('../middlewares/auth');
const isadmin=require('../middlewares/isadmin')


//---create post
router.post('/',postController.createpost);
//---get post by id
router.get('/:id',postController.getPostById);
//---delete post by id
router.delete('/:id',postController.deletePost);
//---update post
router.put('/:id',postController.updatePost);
//---get All posts
router.get('/',postController.getAllPosts);

module.exports=router;


/*
//---create post
router.post('/',auth,postController.createpost);
//---get post by id
router.get('/:id',auth,postController.getPostById);
//---delete post by id
router.delete('/:id',auth,isadmin,postController.deletePost);
//---update post
router.put('/:id',auth,postController.updatePost);
//---get All posts
router.get('/',auth,postController.getAllPosts);

module.exports=router;*/