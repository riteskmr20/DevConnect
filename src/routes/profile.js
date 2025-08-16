const express=require('express');
const User = require("../models/user");
const profileRouter=express.Router();
const jwt=require("jsonwebtoken");
const {userAuth}=require("../middlewares/auth");
profileRouter.get("/profile",userAuth,async(req,res)=>{

  try{
   
     const user=req.user;
  
    res.send(user);
  }catch(err){
    res.status(400).send("ERROR :"+err.message);
  }
    
});

module.exports=profileRouter;