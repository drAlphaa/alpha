const router = require('express').Router()
const UserController = require('../controllers/userCon')
const BmiController = require('../controllers/bmiCon')
const { authentication } = require('../middlewares/auth')

router.post('/signup', UserController.create)
router.post('/signin', UserController.signin)
router.post('/google/signin', UserController.googleSignin)
router.get('/decision', UserController.decision)

router.use( authentication )
router.post('/bmi', BmiController.showUserBmi) //get bmi of periodic time

router.get('/', UserController.showOne) //get user data and current bmi

router.put('/', UserController.updateHeightWeight) //also update bmi

module.exports = router