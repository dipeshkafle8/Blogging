const express=require('express');
const path=require('path');
const cookie=require('cookie-parser');
const session=require('express-session');
const {connectMongo}=require('./connection');
const userRoute=require('./routes/blog');
//Connecting MongoDB
connectMongo("mongodb://127.0.0.1:27017/blogging")
.then(()=>{
    console.log("MongoDb connected");
})



const port=8001;
const app=express();

app.use(express.static('./uploads'));
app.use(cookie());
app.use(session({
    saveUninitialized:true,
    resave:false,
    secret:'abc'   
    // cookie:{
    //     maxAge:60000
    // }
}))

//To recieve form data
app.use(express.urlencoded({extended:false}));

//Setting the view engine as ejs
app.set('view engine','ejs');
app.set('views',path.resolve('./view'));

//Routes
app.use('/',userRoute);


app.listen(port,()=>{
    console.log(`Your server is running at ${port}`);
})

