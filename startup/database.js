const mongoose = require('mongoose')


const logger = require('../startup/logger')


const config = require('config')


module.exports = () => {


    const db = config.get('db')
  

    let credentials = ''


    if (process.env.NODE_ENV === 'production') {


      credentials = `${db.user}:${db.password}@`


    }
  

    const connectionString = `mongodb://${credentials}${db.host}:${db.port}/${db.name}?authSource=admin`


    mongoose.connect(connectionString ,


    {
        useNewUrlParser : true
    })


    .then (()=> {


        logger.log("info",`Connected to MongoDb...`)


    })


    .catch(err => {


        logger.log("error",`Error connecting to MongoDB ...`, err)


        process.exit(1)
        

    })
}