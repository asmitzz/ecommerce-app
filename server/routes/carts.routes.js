const express = require('express');
const router = express.Router();

const { 
    getUserCart,
    checkCart,
    checkProduct,
    addProductInCart,
    increaseQuantityOfProduct,
    decreaseQuantityOfProduct,
    removeProductFromCart,
    emptyCart 
} = require('../controllers/carts.controllers.js')

router.param("uid",checkCart);
router.param("productID",checkProduct);

router.route("/carts/:uid")
.get(getUserCart);

router.route("/carts/:uid")
.post(addProductInCart);

router.route("/carts/:uid/:productID/increasequantity")
.post(increaseQuantityOfProduct)

router.route("/carts/:uid/:productID/decreasequantity")
.post(decreaseQuantityOfProduct)

router.route("/carts/:uid/:productID")
.delete(removeProductFromCart)

router.route("/carts/:uid")
.delete(emptyCart)

module.exports = router;