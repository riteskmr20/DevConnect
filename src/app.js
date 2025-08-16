const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");
const {validateSignUpData}=require('./utils/validation');
const bcrypt=require('bcrypt');
const cookieParser=require("cookie-parser");
const jwt=require("jsonwebtoken");
const {userAuth}=require("./middlewares/auth");

app.use(express.json());
app.use(cookieParser());


//signup api
app.post("/signup", async (req, res) => {

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


app.post("/login",async(req,res)=>{
    try{
      const {emailId,password}=req.body;
      const user=await User.findOne({emailId:emailId});
      if(!user){
        throw new Error("Invalid Credentials");
      }
      const isPasswordValid=await bcrypt.compare(password,user.password);
      if(isPasswordValid){
         
        //Create a jwt token
        const token=await jwt.sign({_id:user._id},"Ritesh@12345",{
          expiresIn:"1h",
        });
        console.log(token);
        
        //Add the token to cookie and send message the response back to the user
        res.cookie("token",token);
        res.send("Login successfull !!");
      }
      else{
        throw new Error("Invalid Credentials");
      }
     
    }catch(err){ 
      res.status(400).send("ERROR:"+err.message);
    }
});


app.get("/profile",userAuth,async(req,res)=>{

  try{
   
     const user=req.user;
  
    res.send(user);
  }catch(err){
    res.status(400).send("ERROR :"+err.message);
  }
    
});


app.post("/sendConnectionRequest",userAuth,async(req,res)=>{
     try{
        const user=req.user;
        console.log("Sending connection request");
        res.send(user.firstName + " Sent the connection request!!");
     }catch(err){
       res.status(400).send("ERROR :"+err.message);
     }
})

//get the email of an user
app.get("/user",async(req,res)=>{
    
  const userEmail=req.body.emailId;
  try{
    const users= await User.find({emailId:userEmail});
    if(users.length===0){
      res.status(404).send("User Not found");
    }
    else{
      res.send(users);
    }
  }catch(err){
    res.status(400).send("Something went wrong!!"+err.message);
  }
});

//Feed API-Get/feed -get all the user from the database
app.get("/feed",async(req,res)=>{
    try{
      const users=await User.find({});
      res.send(users); 
    }
    catch(err){
     res.status(400).send("No user is found" +err.message);
    }
})

//delete user by Id
app.delete("/user",async(req,res)=>{
   
  const userId=req.body.userId;
  try{
    const user=await User.findByIdAndDelete(userId);
    res.send("User deleted Successfully !!");

  }catch(err){
    res.status(400).send("No user found by this Id");
  }
});


//update the user by id
/*app.patch("/user",async(req,res)=>{
    const userId=req.body.userId;
    const data=req.body;
    console.log(userId);
  try{
    const user=await User.findOneAndUpdate({_id:userId},data,{
      returnDocument:"after",
      runValidators:true,
    });
    
    console.log(user);
    res.send("User Updated Successfully!!");
  }
  catch(err){
    res.status(400).send("No user found!!")
  }
});*/


//update the user by email id
app.patch("/user",async(req,res)=>{
   const emailId=req.body.userId;
   const data=req.body;
   try{
    const user=await User.findOneAndUpdate({email:emailId},data,{
      returnDocument:"after",
      runValidators:true,
    });
    res.send("User Updated Successfully!!");
   }catch(err){
     res.status(400).send("No user found!!");
   }
});


connectDb()
  .then(() => {
    console.log("Database connection established...");
    app.listen(3000, () => {
      console.log("Server is successfully listening on port 3000");
    });
  })
  .catch(() => {
    console.log("Database cannot be connected!!");
  });


