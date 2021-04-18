const Carts = require('../models/cart.model');

const checkCart = async(req,res,next,uid) => {
    try {
        const cart = await Carts.findOne({uid});

        if(cart){
           req.cart = cart;
           next();
           return
        }

        req.cart = cart;
        next();
    } catch (error) {
         res.status(404).json({ message:"Something went wrong with server" })
     }
}

const checkProduct = (req,res,next,productID) => {
    const {cart} = req;

    try {
       const product = cart.products.find( p => p.productID === productID);
       if( !product){
           return res.status(404).json({message:"product not found"}) 
       }
       req.product = product;
       next()
    } catch (error) {
        res.status(404).json({message:"product not found"}) 
    }
}

const getUserCart = async(req, res) => {
    const {cart} = req;
    try {
        if(cart){
          return res.status(200).json({cart:cart.products})
        }
        res.status(200).json({cart:[]})
    } catch (error) {
         res.status(404).json({ message:"Cart not found" })
     }

}

const addProductInCart = async(req,res) => {
 
    let {cart} = req;
    const item = req.body;
    const { uid } = req.params;

    if( cart ){
        cart.products.push(item)
        cart = await cart.save()
        return res.status(200).json({message:"Product added in cart"})
    }

    await Carts({ uid,products:[item] }).save()
    res.status(200).json({message:"Product added in cart"})
}

const removeProductFromCart = async(req,res) => {
    let { cart,product } = req;

    await product.remove()
    await cart.save();
    res.status(200).json({message:"Product removed from cart"})
}

const increaseQuantityOfProduct = async(req,res) => {
    let { cart,product } = req;

    product.quantity++
    await cart.save();
    res.status(200).json({message:"Product quantity increased"})
}

const decreaseQuantityOfProduct = async(req,res) => {
    let { cart,product } = req;

    product.quantity--;
    await cart.save();
    res.status(200).json({message:"Product quantity decreased"})
}

const emptyCart = async(req,res) => {
   let { cart } = req;
   cart.products = [];
   await cart.save();
   res.status(200).json({message:"Cart deleted successfully"})
}

module.exports = { 
    getUserCart,
    checkCart,
    checkProduct,
    addProductInCart,
    decreaseQuantityOfProduct,
    increaseQuantityOfProduct,
    removeProductFromCart,
    emptyCart 
};