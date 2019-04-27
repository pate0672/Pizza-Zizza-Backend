const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    

        name: { type : String , minlength: 4, maxlength: 64, required: true},


        size:   { type : String , trim: true,  ENUM : ['small','medium','large','extra large'], default : 'small'},


        price:  { type : Number , max: 10000, default: 1000},


        isGlutenFree: {type : Boolean , default: false},


        imageUrl: {type : String , maxlength: 1024},


        ingredients: [{type: mongoose.Schema.Types.ObjectId, ref : 'Ingredient'}],


        extraToppings: [{type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient'}]


  })

  schema.methods.setPrice = async function(){

      //get ingrediants 

      //loop over it

      // add ing price to total 


      await this.populate("ingredients extraToppings").execPopulate()


      let totalSum = 0


      this.ingredients.forEach(i => totalSum += i.price )


      this.extraToppings.forEach(e => totalSum += e.price )


      this.price = Math.max(1000, totalSum)


  }


  schema.pre('save', async function(){


      await this.setPrice()


  })

  
  const Model = mongoose.model('Pizza', schema)
  
  
  module.exports = Model