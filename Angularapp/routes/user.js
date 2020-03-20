const express=require("express");
const router=express.Router();
const bcrypt=require("bcrypt");
const bodyParser=require("body-parser");
const app=express();
const jwt=require("jsonwebtoken");

const User=require("../models/user");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods","GET,PUT,POST,DELETE,PATCH, OPTIONS");
    next();
});

router.post("/signup",(req,res,next)=>{
    bcrypt.hash(req.body.password,10)
    .then(hash=>{
        const user=new User({
            email :req.body.email,
            password:hash,
        });


        user.save()
        .then(result=>{
            res.status(201).json({
                message :"User Created!",
                result:result
        });
            
            })
            .catch(err=>{
                res.status(500).json({
                    error : err
                });
            });
               

            });
        });
    
router.post("/post-create", (req,res,next)=>{
    let fetchedUser;
    User.findOne({email : req.body.email})
    
    .then(user=>{
       // console.log(user);
        if(!user)
        {
            return res.status(401).json({
                message :"Authentication failed !",
                type : " Invalid Credentials"
            });
        }
        fetchedUser=user;
      return  bcrypt.compare(req.body.password,user.password);
    })
    .then(result=>{
        if(!result)
        {
            return res.status(401).json({
                message :"Authentication failed !"
        });
        }
        const token=jwt.sign({email:fetchedUser.email, userId:fetchedUser._id}, "secret_this_should_be_longer",{expiresIn:"1h"});
        res.status(200).json({
            token : token
        });

    }).catch(err=>{
       // console.log(err);
        return res.status(401).json({
            message :"Authentication failed !"
    });
});
});

module.exports=router;