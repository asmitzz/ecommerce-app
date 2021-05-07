const Users = require('../models/user.model');
const md5 = require('md5');
const jwt = require('jsonwebtoken');

const checkAuth = (req,res,next) => {
   const token = req.headers.authorization.split(" ")[1];
   try {
      if(token){
         const decoded = jwt.verify(token,process.env.SECRET_KEY);
         req.userData = decoded;
         next()
      }
   } catch (error) {
      return res.status(401).json({message:"Auth failed"})
   }
}

const signup = async(req, res) => {
   const {name,email,password} = req.body;
 
   try {
      const checkemail = await Users.findOne({email});
      if(checkemail){
         return res.status(409).json({
            message: "Email address is already registered"
         })
      }
      await Users({name,email,password:md5(password)}).save();
      res.status(200).json({
         message: "Email address is registered successfully"
      });

   } catch (error) {
          res.status(409).json({
            message: "Email address is already registered"
         })
   }
}

const login = async(req,res) => {
   const {email,password} = req.body;
   try {
      const user = await Users.findOne({email});

      if(user.email == email){
         if(user.password == md5(password)){
            const token = jwt.sign({_id:user._id},process.env.SECRET_KEY);
            res.cookie("token", token,{expiresIn:"24h"})
            return res.status(200).json({ 
               login:true,
               token,
               name:user.name,
               email:user.email,
               uid: user._id,
            })
         }
         else{
          return res.status(401).json({ message: "Incorrect password"})
         }
      }

      res.status(404).json({
         message:"Email address is not registered"
      })
     
   } catch (error) {
      if(error){
         res.status(404).json({
            message: "Something went wrong with server"
         })
      }
   }
}

const signout = (req, res) => {
   res.clearCookie("token");
   res.status(200).json({ message:"user signed out successfully" })
}

const protected = (req, res) => {
   res.status(200).json({success:true})
}

module.exports = { signup,login,signout,protected,checkAuth };