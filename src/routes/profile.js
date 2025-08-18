const express=require('express');
const User = require("../models/user");
const profileRouter=express.Router();
const jwt=require("jsonwebtoken");
const {userAuth}=require("../middlewares/auth");
const {validateEditProfileData}=require("../utils/validation");
profileRouter.get("/profile/view",userAuth,async(req,res)=>{

  try{
   
     const user=req.user;
  
    res.send(user);
  }catch(err){
    res.status(400).send("ERROR :"+err.message);
  }
    
});


profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
     try{
       if(!validateEditProfileData(req)){
        throw new Error("Invalid Edit Request");
       }
       const loggedInUser=req.user;
       Object.keys(req.body).forEach((key)=>(loggedInUser[key]=req.body[key]));
       await loggedInUser.save();
       res.send("Profile Updated Successfully!!");
     }catch(err){
       res.status(400).send("ERROR :"+err.message);
     }
});



module.exports=profileRouter;