const router = require('express').Router()
const userRouter = require('./user')
const foodRouter = require('./food')
const { authentication } = require('../middlewares/auth')

router.use('/users', userRouter)
router.use(authentication)
router.use('/foods', foodRouter)

module.exports = router