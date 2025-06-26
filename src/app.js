const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {

 //creating a new user instance of the user model 
  console.log(req.body);
  const user = new User(req.body);

  
  try {
    await user.save();
    res.send("User added succesfully!");
  } catch (err) {
    res.send("Error while adding to the database:" + err.message);
  }
});


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
