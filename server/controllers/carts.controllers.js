const carts = require('../models/cart.model');

const getUserCart = async(req, res) => {
    const uid = req.params.uid;

    try {
        const cart = await carts.findOne({uid});

        if(cart){
          return res.status(200).json({cart:cart.products})
        }
        res.status(200).json({cart:[]})
    } catch (error) {
         res.status(404).json({ message:"Cart not found" })
     }

}

const updateUserCart = async(req,res) => {
    const uid = req.params.uid;

    const getCart = await carts.findOne({uid});

    if(getCart){
        await carts.updateOne({uid},{ $set:{
        uid,
        products:[...getCart.products,req.body]
        } },{ upsert:true });
        return res.status(200).json({message:"Product added in cart"})
    }
    
    await carts.updateOne({uid},{ $set:{
        uid,
        products:[req.body]
        } },{ upsert:true });
     res.status(200).json({message:"Product added in cart"})
}

module.exports = { getUserCart,updateUserCart };