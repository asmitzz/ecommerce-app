const mongoose = require('mongoose');

const wishlistSchema = new mongoose.Schema({
     uid:{
         type:String,
         required:true,
         trim:true
     },
     products:[
         { 
             productID:{
                 type:String
             }, 
             quantity:{
                 type:Number,
                 default:1
             }
        }
    ]
},{ timestamps: true });

module.exports = mongoose.model('Wishlist',wishlistSchema);