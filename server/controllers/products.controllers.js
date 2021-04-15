const product = require('../models/product.model');

const getProducts = async(req, res) => {
   const products = await product.find({});
   res.json({products})
}

module.exports = { getProducts };