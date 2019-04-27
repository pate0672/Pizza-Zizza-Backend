const Order = require('./Order')


const mongoose= require('mongoose');


const schema = new mongoose.Schema({


    name : {type: String, maxlength: 64, required: true},


    price : {type: Number, maxlength: 10000, default: 100},


    quantity : {type: Number, maxlength: 1000, default: 10},


    isGlutenFree : {type: Boolean, default: false},


    imageUrl : {type: String, maxlength: 1024},


    categories : {type: String , ENUM : ['meat','spicy','vegitarian','vegan', 'halal','kosher','cheeze','seasonings']}


})


const Model= mongoose.model('Ingredient',schema);


module.exports=Model;