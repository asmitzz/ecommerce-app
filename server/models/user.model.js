const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        true:true,
    },
    email:{
        type:String,
        trim:true,
        required:true,
        unique:true
    },
    password:{
        type:String,
        trim:true,
        required:true,
        minlength:8,
    },
    cart:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Cart"
    }
},{timestamps:true});

module.exports = mongoose.model('User',userSchema);