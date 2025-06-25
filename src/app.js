const express = require("express");
const connectDb = require("./config/database");
const app = express();
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  const user = new User({
    firstName: "Ritesh",
    lastName: "Kumar",
    emailId: "riteshkmr2002@gmail.com",
    password: "ritesh123",
  });

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
