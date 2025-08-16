const mongoose=require('mongoose');


const connectDb=async()=>{
    await mongoose.connect("mongodb+srv://ritesh:Ritesh12345@cluster0.ww92ok7.mongodb.net/codeTalk");
};

module.exports=connectDb;


 