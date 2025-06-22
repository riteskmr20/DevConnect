const express=require("express");

const app=express();

app.get("/getUserData",(req,res)=>{
    try{
      throw new Error("jjghsg");
      res.send("User data sent");
    }catch(err){
      res.status(500).send(err.message);
    }
    
});


app.use("/",(err,req,res,next)=>{
    if(err){
        res.status(500).send("Something went wrong!");
    }

})

app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000");
});