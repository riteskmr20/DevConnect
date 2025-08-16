const mongoose=require('mongoose');
const validator=require('validator');
const jwt=require("jsonwebtoken");
const bcrypt=require('bcrypt');


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

userSchema.methods.getJWT=async function(){
    const user=this;
    const token=await jwt.sign({_id:user._id},"Ritesh@12345",{
          expiresIn:"1h",
    });
    return token;
}

userSchema.methods.validatePassword=async function(passwordInputByUser){
    const user=this;
    const passwordHash=user.password;
    const isPasswordValid=await bcrypt.compare(
       passwordInputByUser,
       passwordHash
    );
    return isPasswordValid;
}

const User=mongoose.model("User",userSchema);

module.exports=User;