const mongoose = require('mongoose');

const userschema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{        
        type:String,
        required:true,        
    },
    phone:{
        type:Number,
        required:true,        
    },
    password:{
        type:String,
        required:true,        
    },
    admin : {
        type : Boolean,
        required:true,
    }
},{timestamps:true});

const Userschema = mongoose.model('userschema',userschema);
module.exports = Userschema;