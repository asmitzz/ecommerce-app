const express = require('express');
const router = express.Router();

const { getUserCart,updateUserCart } = require('../controllers/carts.controllers.js')

router.route("/carts/:uid")
.get(getUserCart)
.post(updateUserCart);

module.exports = router;