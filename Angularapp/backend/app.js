const express=require("express");
const bodyParser=require("body-parser");
const Post = require('../models/post');
const mongooose=require("mongoose");


const app=express();

const userRoutes=require("../routes/user");

mongooose.connect("mongodb+srv://sanskriti:smb11398@cluster0-xvmkn.mongodb.net/node-angular?retryWrites=true&w=majority")
.then(()=>{
    console.log("Connected to the database!"); 
}).catch(()=>{
    console.log("Connection failed!");
});


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*"); 
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods","GET,PUT,POST,DELETE,PATCH, OPTIONS");
    next();
});

app.post("/api/posts/",(req,res,next)=>{
    const post=new Post({
        username : req.body.username,
        password : req.body.password
    });
    console.log(post);
    post.save();
    res.status(201).json({
        message :" Posted Successfully !"
    });
  
});

app.get('/api/posts',(req,res,next)=>{
    Post.find().then((documents)=>{
        console.log(documents)
        res.status(200).json({
            message : "Post fetched successfully!",
            posts : documents
    });
    // const posts=[
    //     {
    //         id:"1",
    //         username:"dummy",
    //         password:"dummy"
    //     }
    // ];


});
});

app.use("/api/user",userRoutes);
module.exports=app;