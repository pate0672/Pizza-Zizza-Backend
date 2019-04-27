const mongoose = require('mongoose')


const schema = new mongoose.Schema({
    

        customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User',required : true},


        type:  { type: String, ENUM : ['pickup', 'delivery'], default: 'pickup' },


        status :   { type: String , ENUM : ['draft','paid','delivered' ], default: 'draft' },


        pizzas:   { type: mongoose.Schema.Types.ObjectId, ref: 'Pizza'},


        address: { type : String, required: function() {

           
            if(this.type === "delivery"){


                return true


            } 

        } },

        price: { type: Number, default:0 },


        deliveryCharge: {type : Number, default : function(){


            if(this.type === 'delivery'){


                return 500


            }


            else{


                return 0


            }
        }},


        tax : {type : Number, default : 0},


        total : {type : Number, default:0},


        createdAt: {type : Date, default : Date.now()},


        updatedAt : {type: Date, default: Date.now() }

  })
  

  schema.methods.setPriceOrder = async function(){

 
    await this.populate("pizzas deliveryCharge tax").execPopulate()


    let totalSum = 0


    this.pizzas.forEach(i => totalSum += i.price )


    this.deliveryCharge.forEach(e => totalSum += e.deliveryCharge)


    totalSum = this.deliveryCharge + totalSum


    totalSum  = this.price + totalSum


    this.tax = (totalSum * 0.13)


    this.total = totalSum + this.tax

    
}


schema.pre('save', async function(){


    await this.setPriceOrder()


})


  const Model = mongoose.model('Order', schema)
  
  
  module.exports = Model