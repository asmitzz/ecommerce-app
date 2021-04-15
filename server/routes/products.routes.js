const express = require('express');
const router = express.Router();

const { getProducts } = require('../controllers/products.controllers.js')

router.get('/products',getProducts)

module.exports = router;