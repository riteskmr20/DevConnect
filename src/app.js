const express=require("express");

const app=express();



//Handle Auth middleware for all GET POST,....requests GET,POST
app.use("/admin",(req,res)=>{
    const token="xyz";
    const isAdminAuthorized=token==="xyz";
    if(isAdminAuthorized){
        res.send("Admin is Authorized");
    }
    else{
        res.status(401).send("Unauthorized request");
    }
});

app.get("/admin/getAllData",(req,res)=>{
    /*const token="xyz";
    const isAdminAuthorized=token==="xyz";
    if(isAdminAuthorized){
        res.send("Admin is Authorized");
    }
    else{
        res.status(401).send("Unauthorized request");
    }*/
});


app.get("/admin/deleteUser",(req,res)=>{
    const token="xyz";
    const isAdminAuthorized=token==="xyz";
    if(isAdminAuthorized){
        res.send("Deleted a User");
    }
    else{
        res.status(401).send("Unauthorized request");
    }
});

app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000");
});