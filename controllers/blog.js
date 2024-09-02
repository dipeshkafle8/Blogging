const {User}=require('../models/blog');

async function createUser(req,res){
    
   let data=await User.create({
    username:req.body.username,
    password:req.body.password,
    role:"author",
    blog:[]
   });   
   res.redirect('/dashboard');
}




//for authorizing purpose
async function findUserAndAutho(req,res){  
let user=await User.find({username:req.body.username,password:req.body.password});
if(user.length===0)
res.json({msg:"user not found"});

else
 {
    req.session.username=req.body.username;
    req.session.password=req.body.password;   
    
    if(user[0].role=='admin'){
        req.session.role="admin";    
    }
   else
   {    req.session.role="author";
   
   }
   res.redirect('/dashboard');
 }

}

async function manageDashboard(req,res){
    let allauthors= await User.find({},{username:1,role:1});
    
      // console.log(allauthors);
    if(req.session.role=="admin"){
    res.render("admin",{
        allAuth:allauthors
    });
    }
  else if(req.session.role=="author"){
  res.render("author");
  }
  else{
    res.redirect("/");
  }
}

function manageLogOut(req,res){
    req.session.destroy();
    res.redirect('/');
}

function maintianSession(req,res){
    if(req.session.username)
    res.redirect('/dashboard');
else    
    res.render("login");
}
async function handleCreatePost(req,res){
 let update= await User.findOneAndUpdate({username:req.session.username},{$push:{
   blog:{ title:req.body.title,
    src:req.file.filename,
    desc:req.body.blog
}}});

 res.json({msg:"post created"});
}
async function seeAllPosts(req,res){
    if(req.session.role=="admin"){    
    
    let allPosts= await User.find({});
    res.render("allpost",{
        allPost:allPosts,
    });
}
else if(req.session.role=="author"){
    let allPosts=await User.find({username:req.session.username});
    res.render("allpost",{
        allPost:allPosts,
    })
}

}
async function deleteAuthor(req,res){
    if(req.session.role=="admin"){
    await User.deleteOne({_id:req.params.id});
    res.redirect('/dashboard');
    }
   else
res.json({msg:"Unauthorized User"});
}

function authoForCreateUser(req,res){    
        if(req.session.role=="admin")
        res.render("createuser");
    else
      res.json({msg:"You are not authorized to this task"});    
}

module.exports={
    createUser,
    findUserAndAutho,
    manageDashboard,
    manageLogOut,
    maintianSession,
    handleCreatePost,
    seeAllPosts,
    deleteAuthor,
    authoForCreateUser,
}