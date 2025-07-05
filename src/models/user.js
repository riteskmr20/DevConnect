const mongoose=require('mongoose');
const validator=require('validator');
const userSchema=new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        trim:true
    },
    lastName:{
        type:String,
        trim:true
        

    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        lowercase:true,
        trim:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error("Invalid Address"+value);
            }
        },
    }, 
    password:{
      type:String,
      required:true
    },
    age:{
        type:Number,
        required:true,
        min:18,
        max:35
    },
    gender:{
        type:String,
        required:true,
        trim:true,
        validate(value){
            if(!["male","femail","others"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        }
    }
});

const User=mongoose.model("User",userSchema);

module.exports=User;