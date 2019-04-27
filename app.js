require('./startup/database')()


const logger = require('./startup/logger')


const express = require('express')


const app = express()


app.use(express.json())


const cors = require('cors')


app.use(cors())


app.use('/api/pizzas',require('./Routes/Pizzas'))


app.use('/api/ingredients',require('./Routes/Ingredients'))


app.use('/api/orders',require('./Routes/Orders'))


app.use('/auth', require('./Routes/Authentication'))


const port = process.env.PORT || 3030


app.listen(port, () => logger.log("info",`Express is listening on port ${port}...`))