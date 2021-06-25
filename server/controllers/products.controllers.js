const Product = require('../models/product.model');

const getProduct = async (req, res) => {
   const { productId } = req.params;
   const product = await Product.findById(productId);
   if(product){
      return res.status(200).json({ product  })
   }
   res.status(404).json({ message:"product not found" })
}

const getProducts = async(req, res) => {
   const products = await Product.find({});
   res.json({products})
}

module.exports = { getProducts,getProduct };