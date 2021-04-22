const Orders = require("../models/order.model");
const Users = require("../models/user.model");

const createOrder = async(req,res) => {
   const { uid,products,address } = req.body;
   const order = await Orders.create({ uid,products,address });

   if(order){
      const userReference = await Users.findById(uid);
      userReference.orders.push(order.id);
      await userReference.save((err,result) => {
          if(err){
              return res.status(500).json({message:err.message})
          }
          if(result){
              return res.status(200).json({message:"Order placed successfully"})
          }
      })
      return;
   }

   res.status(500).json({message:"something went wrong with server"});
}

const getOrderDetails = async(req,res) => {
    const {uid} = req.params;

    const data = await Orders.find({uid});

    const products = data.map( order => order.products.map( p => p.product ) )

    if(data.length > 0) {
        const orders = data.map( order => ({ orderID:order._id,products: order.products,address: order.address,Time: order.createdAt}) )
        return res.status(200).json({orders})
    }

    res.status(404).json({orders:[],message:"No orders found"})
    
}

module.exports = {createOrder,getOrderDetails};