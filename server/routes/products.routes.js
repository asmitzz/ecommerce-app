const express = require('express');
const router = express.Router();

const { getProducts,getProduct } = require('../controllers/products.controllers.js')

router.get('/products/:productId',getProduct)
router.get('/products',getProducts)

module.exports = router;