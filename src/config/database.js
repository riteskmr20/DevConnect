const mongoose=require('mongoose');


const connectDb=async()=>{
    await mongoose.connect("mongodb+srv://ritesh:Ritesh123@cluster0.ww92ok7.mongodb.net/codeTalk");
};

module.exports=connectDb;


