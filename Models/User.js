const mongoose = require('mongoose')


const jwt = require('jsonwebtoken')


const bcrypt = require('bcryptjs')


const saltRounds = 14


const schema = new mongoose.Schema({


    firstName : {type: String , trim : true , maxlength : 64, required : true},


    lastName : {type : String , trim : true, maxlength : 64 , required : true},


    email : {type : String , trim : true , maxlength : 512 , required : true},


    password : {type : String , trim : true , maxlength :70 , required : true},


    isStaff : { type : Boolean , trim : true , default : false , required : true}


})


schema.methods.generateAuthToken = function() {


    return jwt.sign({_id: this._id}, 'superSecureSecret')

    
  }

schema.statics.authenticate = async function(email, password) {


    const user = await this.findOne({email: email})


    const hashedPassword = user


      ? user.password


      : `$2b$${saltRounds}$invalidusernameaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa`


    const passwordDidMatch = await bcrypt.compare(password, hashedPassword)

  
    return passwordDidMatch ? user : null


  }


  schema.pre('save', async function(next) {

    
    if (!this.isModified('password')) return next()

  
    this.password = await bcrypt.hash(this.password, saltRounds)


    next()


  })


  schema.methods.toJSON = function() {


    const obj = this.toObject()


    delete obj.password


    delete obj.__v


    return obj

    
  }


const Model = mongoose.model('User', schema)


module.exports = Model