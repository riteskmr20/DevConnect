const express=require("express");

const app=express();



//Handle Auth middleware for all GET POST,....requests GET,POST
app.use("/admin",(req,res,next)=>{
    console.log("Admin auth is checked");
    const token="xyz";
    const isAdminAuthorized=token==="xyz";
    if(!isAdminAuthorized){
        res.status(401).send("Unauthorized request");
    }
    else{
       next();
    }
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