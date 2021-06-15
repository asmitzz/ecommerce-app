const express = require('express');
const router = express.Router();

const { 
    checkWishlist,
    checkProduct,
    getUserWishlist,
    removeProductFromWishlist,
    addProductInWishlist
} = require('../controllers/wishlists.controllers.js')

router.param("uid",checkWishlist);
router.param("productID",checkProduct);

router.route("/wishlists/:uid")
.get(getUserWishlist);

router.route("/wishlists/:uid")
.post(addProductInWishlist);

router.route("/wishlists/:uid/:productID")
.delete(removeProductFromWishlist)

module.exports = router;