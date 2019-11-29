const router = require('express').Router()
const FoodController = require('../controllers/foodCon')

router.post('/', FoodController.create)
router.post('/user', FoodController.showUserFoods)

module.exports = router