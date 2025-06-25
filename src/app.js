const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {


  console.log(req.body);
  const user = new User(req.body);

  //creating a new user instance of the user model
  try {
    await user.save();
    res.send("User added succesfully!");
  } catch (err) {
    res.send("Error while adding to the database:" + err.message);
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
