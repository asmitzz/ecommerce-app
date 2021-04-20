const Wishlists = require('../models/wishlist.model');
const Products = require('../models/product.model');
const Users = require('../models/user.model');

const checkWishlist = async(req,res,next,uid) => {
    try {
        const wishlist = await Wishlists.findOne({uid});
        req.wishlist = wishlist;
        next();
    } catch (error) {
         res.status(404).json({ message:"wishlist not found" })
     }
}

const checkProduct = async(req,res,next,productID) => {
    const {wishlist} = req;
  
    try {
       const product = wishlist.products.find( i => i == productID );

       if(!product){
           return res.status(404).json({message:"product not found"}) 
       }
       req.product = product;
       next()
    } catch (error) {
        res.status(404).json({message:"product not found"}) 
    }
}

const getUserWishlist = async(req, res) => {
    const {wishlist} = req;

    try {
        if(wishlist){
          const {products} = await wishlist.execPopulate({ path:"products",populate:"product" });
          return res.status(200).json({wishlist:products})
        }
        res.status(200).json({wishlist:[]})
    } catch (error) {
         res.status(404).json({ message:"Wishlist not found" })
     }

}

const addProductInWishlist = async(req,res) => {

    let {wishlist} = req;
    const {productID} = req.body;
    const { uid } = req.params;

    const product = await Products.findById(productID);
    if(wishlist){
        wishlist.products.push(product.id);
        await wishlist.save();
        return res.status(200).json({message:"Product added in wishlist"})
    }

    const createWishlist = await Wishlists.create({ uid,products:[product.id] });
    let userReference = await Users.findById(uid);
    userReference.wishlist = createWishlist.id;
    userReference = await userReference.save()
    res.status(200).json({ message:"Product added in wishlist"})
}

const removeProductFromWishlist = async(req,res) => {
    let { wishlist,product } = req;

    wishlist.products.remove(product)

    await wishlist.save();
    res.status(200).json({message:"Product removed from wishlist"})
}


module.exports = { 
    checkWishlist,
    checkProduct,
    getUserWishlist,
    removeProductFromWishlist,
    addProductInWishlist
};