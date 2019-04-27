const logger = require('../../startup/logger')


const express = require('express')


const jwt = require('jsonwebtoken')


const authorize = require('../../middleware/auth')


const sanitizeBody = require('../../middleware/sanitizeBody')


const User = require('../../Models/User')


const LoginInfo = require('../../Models/authenticate_attempts')


const router = express.Router()


router.post('/users', sanitizeBody, async (req, res) => {


    try {

  
      let newUser = new User(req.sanitizedBody)

      
      await newUser.save()

  
      res.status(201).send({data: newUser})

  
    } catch (err) {

  
      console.log(err.message)

  
      res.status(500).send({

  
        errors: [
          {


            status: 'Internal Server Error',


            code: '500',


            title: 'Problem saving document to the database.'


          }
        ]
      })
    }
})


const update = () => async( req, res, next) => {


  try{


      const user = await User.findById(req.user._id)


      user.password = req.sanitizedBody.password

      
      await user.save()
  

      res.send({data : user})


  }


 catch(err)


 {


    next(err)


    res.status(401).send({


    errors: [
      {


        status: 'Authentication error',


        code: '401',


        title: 'You have no permission to change password'


      }]
    }) 
      
 }
}


router.patch('/users/me', authorize, sanitizeBody , update())


router.get('/users/me'  ,authorize, async ( req, res)=>{


  const user = await User.findById(req.user._id).select('-password -__v')

  
    res.send({data: user})

    
})


router.post('/tokens',sanitizeBody, async (req, res) => {


    const {email, password} = req.sanitizedBody

  
    const user = await User.authenticate(email,password)

  
    if (!user) {

        
      return res.status(401).send({ errors: ['we will build this later'] })

  
    }
  

    res.status(201).send({data: {token : user.generateAuthToken()}})

    // if any condition failed, return an error message
  
    if (!user) {
  

      return res.status(401).send({
  

        errors: [
          {

            status: 'Unauthorized',


            code: '401',


            title: 'Incorrect username or password.'
  
          }
        ]
      })
    }
  
})


module.exports = router