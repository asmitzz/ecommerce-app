const Addresses = require("../models/address.model");
const Users = require("../models/user.model");

const checkAddresses = async(req,res,next,uid) => {
    const data = await Addresses.findOne({uid});
    req.userAddress = data;
    next();
}

const getUserAddresses = (req,res) =>{
    const {userAddress} = req;
      
     if(userAddress){
        return res.status(200).json({ addresses:userAddress.addresses })
     }

     res.status(404).json({ message:"User addresses not found" })
}

const addAddress = async(req,res) => {
    const {userAddress} = req;
    const {uid} = req.params;

    try {
        if(!userAddress){
            const createAddress = await Addresses.create({uid,addresses:[req.body]});
            let userReference = await Users.findOne({_id:uid});
            userReference.addresses = createAddress.id;
            await userReference.save()
            return res.status(200).json({message:"Address added successfully"})
        }

        userAddress.addresses.push(req.body);
        
        await userAddress.save();
        res.status(200).json({message:"Address added successfully"})
    } catch (error) {
        res.status(500).json({message:"something went wrong with server"})
    }
}

const removeAddress = async (req, res) => {
    const {userAddress} = req;
    const {addressID} = req.params;

    userAddress.addresses = userAddress.addresses.filter(address => address.addressID != addressID);
    await userAddress.save((err,result) => {
        if(result){
           return res.status(200).json({message:"Address removed successfully"})
        }
        if(err){
            return res.status(500).json({message:"Something went wrong with server"})
        }
    })

}

const updateAddress = async(req,res) => {
    const {userAddress} = req;
    const {addressID} = req.params;

    userAddress.addresses = userAddress.addresses.map(address => address.addressID == addressID ? req.body : address);
     await userAddress.save((err,result) => {
        if(result){
            return res.status(200).json({message:"Address updated successfully"})
         }
         if(err){
             return res.status(500).json({message:"Something went wrong with server"})
         }
     });

}

module.exports = { getUserAddresses,checkAddresses,addAddress,removeAddress,updateAddress }