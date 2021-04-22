const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    uid:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User"
    },
    
})

module.exports = mongoose.model("Order",orderSchema);