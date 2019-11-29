if (process.env.NODE_ENV == 'development') require('dotenv').config()

//setup mongoose
const mongoose = require('mongoose')
const uris = 'mongodb://localhost:27017/alpha'

mongoose.connect(uris, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true,
    useCreateIndex: true
})
    .then(() => { 
        console.log('db connected')
    })
    .catch(() => {
        console.log('db disconnected');
    })

//setup express
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require('./routes')
const errorHandler = require('./middlewares/errorHandler')
const cors = require('cors')
const morgan = require('morgan')

app.use(express.urlencoded({ extended: false}))
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
app.use('/', router)
app.use(errorHandler)

app.listen(port, () => {
    console.log('listening port ', port)
})