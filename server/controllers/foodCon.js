const Food = require('../models/food')
const axios = require('axios')

class FoodController {

    static create(req, res, next) {
        axios({
            method: 'GET',
            url: `https://api.ocr.space/parse/imageurl?apikey=69e2ce192288957&url=${req.body.url}&isOverlayRequired=true`,
        })
        .then(result => {
            res.status(200).json(result.data)
            return
            const calorie = result
            const name = req.body.name
            const userId = req.loggedUser._id
            const date = Date.now()
            return Food.create({
                name,
                calorie,
                userId,
                date
            })
        })
        .then(food => {
            res.status(201).json(food)
        })
        .catch(next)
    }

    static showUserFoods(req, res, next) {
        const start = new Date(req.body.start)
        const end = new Date(req.body.end)
        const userId = req.loggedUser._id
        Food.find({
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
        .then(foods => {
            res.status.json(foods)
        })
        .catch(next)
    }
}

module.exports = FoodController