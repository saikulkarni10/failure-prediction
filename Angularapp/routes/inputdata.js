const express=require("express");
const router=express.Router();
const bcrypt=require("bcrypt");
const bodyParser=require("body-parser");
const app=express();
const jwt=require("jsonwebtoken");

const Input=require("../models/data");


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : false}));

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","Origin,X-Requested-With,Content-Type,Accept");
    res.setHeader("Access-Control-Allow-Methods","GET,PUT,POST,DELETE,PATCH, OPTIONS");
    next();
});

router.post("/inputdata",(req,res,next)=>{
       // console.log("Hi 1");
        const input1=new Input({
            enteredAge : req.body.enteredAge,
            enteredGender : req.body.enteredGender,
            total_bilirubin : req.body.total_bilirubin,
            direct_bilirubin : req.body.direct_bilirubin,
            alkaline_phosphotase : req.body.alkaline_phosphotase,
            alamine_aminotransferase : req.body.alamine_aminotransferase,
            aspartate_aminotransferase : req.body.aspartate_aminotransferase,
            total_proteins : req.body.total_proteins,
            albumin : req.body.albumin,
            albumin_and_globulin_ratio:  req.body.albumin_and_globulin_ratio
        });
       
        input1.save()
        .then(result=>{
            res.status(201).json({
                message :"User Data Saved!"
        });
            
            })
            .catch(err=>{
                res.status(500).json({
                    error : err
                });
            });
               

            });
       
    

module.exports=router;