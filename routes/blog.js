const express=require('express');
const {createUser,
findUserAndAutho,
manageDashboard,
manageLogOut,
maintianSession,
handleCreatePost,
seeAllPosts,
deleteAuthor,
authoForCreateUser}=require('../controllers/blog');
const router=express.Router();
//Multer
const multer=require('multer');
const storage=multer.diskStorage({
    destination:function(req,file,cb){
       cb(null,'uploads/');
    },
    filename:function(req,file,cb){
        cb(null,Date.now()+'-'+file.originalname);
    }

})
const upload=multer({storage:storage});



router.get('/',maintianSession);
router.post('/',findUserAndAutho);
router.get('/dashboard',manageDashboard);
router.get('/logout',manageLogOut);
router.post('/user',createUser);

router.get('/createAuthor',authoForCreateUser);

router.get('/createpost',(req,res)=>{
    res.render("createpost");
})
router.post('/createpost',upload.single('pic'),handleCreatePost);
router.get('/allpost',seeAllPosts);
router.get('/deleteAuthor/:id',deleteAuthor);


module.exports=router;