const express=require("express");

const app=express();





app.use("/user",(req,res)=>{
   res.send("HAHAHAHAHA");
});


app.get("/user",(req,res)=>{
    res.send({firstname:"Ritesh",lastname:"Kumar"});
})

app.post("/user",(req,res)=>{
    res.send("Data successfully saved to the database!");
})


app.delete("/user",(req,res)=>{
    res.send("Data sucessfully deleted from the database!");
});


 app.use("/hello/2",(req,res)=>{
    res.send("Hello,Hello,Hello");
});

app.use("/hello",(req,res)=>{
    res.send("Hello from the server");
});
 


app.use("/",(req,res)=>{
    res.send("Namaste Ritesh");
});



     
app.listen(3000,()=>{
    console.log("Server is successfully listening on port 3000");
});