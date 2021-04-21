const express = require("express");
const router = express.Router();

const { checkAddresses,getUserAddresses,addAddress,removeAddress,updateAddress } = require("../controllers/addresses.controllers");

router.param("uid",checkAddresses)
router.route("/addresses/:uid").get(getUserAddresses);
router.route("/addresses/:uid").post(addAddress);

router.route("/addresses/:uid/:addressID").post(updateAddress);
router.route("/addresses/:uid/:addressID").delete(removeAddress);

module.exports = router;