const Ingredient = require('../Models/Ingredient')


const sanitizeBody = require('../middleware/sanitizeBody')


const express = require('express')


let User = require('../Models/User')


let authenticate = require('../middleware/auth')


const router = express.Router()


router.get('/', async(req, res) => {


    const ingredient = await Ingredient.find()


   res.send({


    Ingredients : ingredient


  })



})



router.post('/', authenticate, sanitizeBody, async ( req, res) =>{


    let user = await User.findById(req.user._id)

    // res.send({data : user})

    if(user.isStaff)
    {


        let newingredient = new Ingredient(req.sanitizedBody)


        await newingredient.save()


        res.status(201).send({ data: newingredient })


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


router.get('/:id', async (req, res) =>{

    try{


        const ingredient = await Ingredient.findById(req.params.id)


        if (!ingredient) throw new Error('Resource not found')

        res.send({


          Ingredients : ingredient


        })
    }
    catch(err)
    {


        console.log(err)


        sendResourceNotFound(req, res)

        
    }
})


const update = (overwrite = false) => async (req, res) => {


    let user = await User.findById(req.user._id)


    if(user.isStaff)
    {


        try {


            const course = await Ingredient.findByIdAndUpdate(

      
              req.params.id,

      
              req.sanitizedBody,

      
              {

                new: true,


                overwrite,


                runValidators: true

              }
            )
      

            if (!course) throw new Error('Resource not found')
      

            res.send({ data: course })
      
          } 

          catch (err)
           {
      

            sendResourceNotFound(req, res)
      

          }

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

  }

  
router.put('/:id',authenticate, sanitizeBody, update((overwrite=true)))

  
router.patch('/:id', authenticate, sanitizeBody, update((overwrite=false)))


router.delete('/:id', authenticate, async (req,res) => {


    let user = await User.findById(req.user._id)


    if(user.isStaff)
    {

        try {


            const ingredient = await Ingredient.findByIdAndRemove(req.params.id)

        
            if (!ingredient) throw new Error('Resource not found')

        
            res.send({


              data: ingredient

              
            })
        
          } catch (err) {
        

            sendResourceNotFound(req, res)

        
          }

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


function sendResourceNotFound(req,res)
{
    {

        res.status(404).send({


            error : [
                {


                    status : 'Not found',


                    code : '404',


                    title : 'Return does not exist',


                    description : `We could not find a ingrediants with id : ${req.params.id}`


                }
            ]
        })
    }
}


module.exports = router;
