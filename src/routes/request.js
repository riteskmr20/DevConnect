const express=require('express');
const User = require("../models/user");
const requestRouter=express.Router();
const jwt=require("jsonwebtoken");
const {userAuth}=require("../middlewares/auth");

requestRouter.post("/sendConnectionRequest",userAuth,async(req,res)=>{
     try{
        const user=req.user;
        console.log("Sending connection request");
        res.send(user.firstName + " Sent the connection request!!");
     }catch(err){
       res.status(400).send("ERROR :"+err.message);
     }
});

module.exports=requestRouter;

