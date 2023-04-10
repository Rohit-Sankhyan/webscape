const mongoose = require('mongoose')
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const Schema = mongoose.Schema
var User = new Schema({
    username: {
        type: String,
        required:true
    },
    password: {
        type: String,
        required:true
    },
    tokens:[{
        token:{
            type: String,
            required:true
        }
    }]
})
//token generation
User.methods.gentoken = async function(){
    try{
        console.log(this._id)
        const key = process.env.JWT_SECRET_KEY;
        const token = jwt.sign({_id:this._id.toString()},key,{
            expiresIn: process.env.JWT_EXPIRES_IN
        });
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    }catch(error){
        res.send(`${error}`)
        console.log(error)
    }
}
   //hashing password
   User.pre("save", async function(next){
       if(this.isModified("password"))
       {
        
        console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10);
        console.log(`the current password is ${this.password}`);
       }
       next();
   })
  
module.exports = mongoose.model('User', User)