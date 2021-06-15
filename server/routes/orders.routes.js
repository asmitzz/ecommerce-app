const express = require('express');
const router = express.Router();

const {createOrder,getOrderDetails} = require('../controllers/orders.controllers.js');

router.route("/order")
.post(createOrder);

router.route("/orders/:uid")
.get(getOrderDetails);

module.exports = router;