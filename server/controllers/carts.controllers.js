const Carts = require('../models/cart.model');
const Products = require('../models/product.model');
const Users = require('../models/user.model');

const checkCart = async(req,res,next,uid) => {
    try {
        const cart = await Carts.findOne({uid});
        req.cart = cart;
        next();
    } catch (error) {
         res.status(404).json({ message:"cart not found" })
     }
}

const checkProduct = (req,res,next,productID) => {
    const {cart} = req;

    try {
       const product = cart.products.find( i => i.product == productID );

       if(!product){
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
          const {products} = await cart.execPopulate({ path:"products",populate:"product" });
          return res.status(200).json({cart:products})
        }
        res.status(200).json({cart:[]})
    } catch (error) {
         res.status(404).json({ message:"Cart not found" })
     }

}

const addProductInCart = async(req,res) => {
 
    let {cart} = req;
    const {productID,quantity} = req.body;
    const { uid } = req.params;

    const product = await Products.findById(productID);
    if(cart){
        cart.products.push({product:product.id,quantity});
        await cart.save();
        return res.status(200).json({message:"Product added in cart"})
    }

    const createCart = await Carts.create({ uid,products:[{product:product.id,quantity}] });
    let userReference = await Users.findById(uid);
    userReference.cart = createCart.id;
    userReference = await userReference.save()
    res.status(200).json({ message:"Product added in cart"})
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