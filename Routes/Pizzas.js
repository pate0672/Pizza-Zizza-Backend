const sanitizeBody = require('../middleware/sanitizeBody')



const Pizza = require('../Models/Pizza')


const express = require('express')


const User = require('../Models/User')


const authenticate = require('../middleware/auth')


const router = express.Router()


router.get('/',  async (req, res) => {


  const pizza = await Pizza.find().populate('ingredients');


  res.send({


    data : pizza


 })

})


router.post('/',authenticate, sanitizeBody, async (req, res) => {


   let user = await User.findById(req.user._id)

  
   if(user.isStaff)
  
   {
  
  
    let newPizza = new Pizza(req.sanitizedBody)


     await newPizza.save()
 

     res.status(201).send({
     
      
       data: newPizza
 
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

 
    const pizza = await Pizza.findById(req.params.id).populate("ingredients")

 
    if (!pizza) throw new Error('Resource not found')

 
    res.send({
 
 
      data: pizza
 
 
    })


  } catch (err) {
 

    console.error(err)


    sendResourceNotFound(req, res)
  }

})


const update = (overwrite = false) => async (req, res) => {


  let user = await User.findById(req.user._id)

  
  if(user.isStaff)
  {

    const pizza = await Pizza.findByIdAndUpdate(
 

      req.params.id,


      req.sanitizedBody,


      {


        new: true,
       
       
        overwrite,
       
       
        runValidators: true

      }
    )
    
    
    if (!pizza) throw new Error('Resource not found')


    res.send({


     data: pizza


   })
  }
  else{

    console.log(err.message);


    sendResourceNotFound(req, res)

  }


}
 

router.patch('/:id',authenticate , sanitizeBody, update((overwrite = false)))


router.put('/:id', authenticate,sanitizeBody, update((overwrite = true)))


router.delete('/:id',authenticate ,async (req, res) => {


  let user = await User.findById(req.user._id)

  
  if(user.isStaff)
  {

    const pizza = await Pizza.findByIdAndRemove(req.params.id)
 

     if (!pizza) throw new Error('Resource not found')
 

     res.send({
     
     
      data: pizza
     
    
    })

  }
  else{

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