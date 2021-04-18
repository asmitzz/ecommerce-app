const Users = require('../models/user.model');
const md5 = require('md5');

const signup = async(req, res) => {
   const {name,email,password} = req.body;

   try {
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
   try {
      const email = await Users.findOne({email:req.body.email});
      const password = await Users.findOne({password:md5(req.body.password)});

      if(email){
         if(password){
            return res.status(200).json({ 
               name:email.name,
               email:email.email,
               uid: email._id 
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

module.exports = { signup,login };