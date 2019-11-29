const Bmi = require('../models/bmi')
const User = require('../models/user')

class BmiController {

    static create(req, res, next) {
        const userId = req.loggedUser._id
        let bmi = 0
        User.findById(userId)
            .then(user => {
                const { weight, height } = user
                bmi = weight/(height*height)
                return Bmi.create({
                    userId,
                    bmi,
                    date: new Date()
                })
            })
            .then(bmi => {
                res.status(201).json(bmi)
            })
            .catch(next)
    }

    static showUserBmi(req, res, next) {
        const userId = req.loggedUser._id
        const start = new Date(req.body.start)
        const end = new Date(req.body.end)
        Bmi.find({
            $and: [
                {userId},
                {date: {
                    $lte: end
                    }
                },
                {date: {
                    $gte: start
                    }
                }
            ]
        })
            .sort('date')
            .then(bmi => {
                res.status(200).json(bmi)
            })
    }

}

module.exports = BmiController