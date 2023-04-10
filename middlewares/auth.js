const jwt = require('jsonwebtoken')
const signup = require("../models/users")

const auth = async (req,res,next)=>{
    try{
        const token = req.cookies.jwt;
    //     const verifyUser = jwt.verify(token,process.env.SECRET_KEY);
    //     console.log(verifyUser);
    //     console.log("verified")
    // next();
    let jwtSecretKey = process.env.JWT_SECRET_KEY;
  
        const verified = jwt.verify(token, jwtSecretKey);
        if(verified){
            res.render("secret")
        }else{
            // Access Denied
            res.status(401)
            res.render("authenticate")
        }
    } catch (error) {
        // Access Denied
        res.status(401)
        res.render("authenticate")
    }

}


module.exports = auth;