const sanitizeBody = require('../middleware/sanitizeBody')


const Order = require('../Models/Order')


const express = require('express')


const User = require('../Models/User')


const authenticate = require('../middleware/auth')


const router = express.Router()


router.get('/', async (req, res) => {


  const order = await Order.find().populate("customer pizzas")


  res.send({


    data : order


 })

})


router.post('/',authenticate, sanitizeBody, async (req, res) => {


   let user = await User.findById(req.user._id)

   
   if(user.isStaff)
   {

        let newOrder = new Order(req.sanitizedBody)


        await newOrder.save()

    
        res.status(201).send({

        
            data: newOrder

    
        })
   }
   else
   {
        
    res.status(401).send({


            errors: [{


                status: 'Unauthorize User',


                code: '401',


                title: 'You have no permission to Access database'

            }]
        })
   }

})


router.get('/:id', async (req, res) => {


 try {


   const order = await Order.findById(req.params.id).populate("customer pizzas")


   if (!order) throw new Error('Resource not found')


   res.send({


     data: order


   })


 } catch (err) {


   console.error(err)


   sendResourceNotFound(req, res)
 }

})


const update = (overwrite = false) => async (req, res) => {


   try {


     const order = await Order.findByIdAndUpdate(

 
       req.params.id,

 
       req.sanitizedBody,

 
       {
 

         new: true,


         overwrite,


         runValidators: true
 
       }
     )

     if (!order) throw new Error('Resource not found')

 
     res.send({


       data: order


     })
 

   } catch (err) {


    console.log(err.message)

    
    sendResourceNotFound(req, res)
    
   }
}
 

router.patch('/:id',sanitizeBody, update((overwrite = false)))


router.put('/:id',sanitizeBody, update((overwrite = true)))


router.delete('/:id',async (req, res) => {

 
   try {


     const order = await Order.findByIdAndRemove(req.params.id)

 
     if (!order) throw new Error('Resource not found')

 
     res.send({


       data: order


     })
 
   } catch (err) {
 

    sendResourceNotFound(req, res)

 
   }


})


function sendResourceNotFound(req, res) {
 {

   console.log(res.message)


   res.status(404).send({


     errors: [{


       status: 'Not found',


       code: '404',


       title: 'Return does not exist',


       description: `We could not find a Student with id : ${req.params.id}`


     }]
   })
 }

}


module.exports = router