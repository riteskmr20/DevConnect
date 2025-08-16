const express=require('express');
const {validateSignUpData}=require('../utils/validation');
const authRouter=express.Router();
const User = require("../models/user");
const bcrypt=require('bcrypt');
const jwt=require("jsonwebtoken");
const {userAuth}=require("../middlewares/auth");


authRouter.post("/signup", async (req, res) => {
 try {
  //validation check wheather the enter user data is correct or not
  validateSignUpData(req);

  const {firstName,lastName,emailId,gender,age,password}=req.body;
  //Now encrypt the user password
  const passwordHash=await bcrypt.hash(password,10);
  console.log(passwordHash);

 //creating a new user instance of the user model 
 // console.log(req.body);

   const user = new User({
    firstName,
    lastName,
    emailId,
    password:passwordHash,
    gender,
    age
   });
   
    await user.save();
    res.send("User added succesfully!");
  } catch (err) {
    res.status(400).send("ERROR:" + err.message);
  }
});

authRouter.post("/login",async(req,res)=>{
    try{
      const {emailId,password}=req.body;
      const user=await User.findOne({emailId:emailId});
      if(!user){
        throw new Error("Invalid Credentials");
      }
      const isPasswordValid=await user.validatePassword(password);
      if(isPasswordValid){
         
        //Create a jwt token
        const token=await user.getJWT();
        
        
        //Add the token to cookie and send message the response back to the user
        res.cookie("token",token,{
          expires:new Date(Date.now()+8*3600000)
        });

        res.send("Login successfull !!");
      }
      else{
        throw new Error("Invalid Credentials");
      }
     
    }catch(err){ 
      res.status(400).send("ERROR:"+err.message);
    }
});



module.exports=authRouter;