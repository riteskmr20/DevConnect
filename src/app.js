const express=require("express");

const app=express();

const {adminAuth,userAuth}=require('./middlewares/auth')

//Handle Auth middleware for all GET POST,....requests GET,POST
app.use("/admin",adminAuth);



//get understand this userAuth clearly
app.get("/user",userAuth,(req,res)=>{
   res.send("User Data sent");
});


app.get("/admin/getAllData",(req,res)=>{
    res.send("All Data Sent");
});


app.get("/admin/deleteUser",(req,res)=>{
    res.send("Deleted a User");
});

app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000");
});