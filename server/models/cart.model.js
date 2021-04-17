const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
     uid:{
         type:String,
         required:true,
         trim:true
     },
     products:[
         { 
             productID:{
                 type:String,
                 required:true
             },
             quantity:{
                 type:Number,
                 default:1
             }
        }
    ]
},{ timestamps: true });

module.exports = mongoose.model('Cart',cartSchema);