const User = require('../models/user')
const { check } = require('../helpers/bcrypt')
const { generateToken, verifyToken } = require('../helpers/jwt')
const Bmi = require('../models/bmi')
const axios = require('axios')

class UserController {

    static create(req, res, next) {
        let bmiData
        let userData
        User.create(req.body)
            .then(user => {
                userData = user
                const { weight, height } = user
                bmiData = weight/(height*height)
                return Bmi.create({
                    userId: userData._id,
                    bmi: bmiData,
                    date: new Date()
                })
            })
            .then(bmi => {
                res.status(200).json({userData, bmiData})
            })
            .catch(next)
    }

    static signin(req, res, next) {
        const {identity, password} = req.body
        User.findOne({
            $or: [{email: identity}, {name: identity}]
        })
            .then(user => {
                if (!user) throw {message: 'data not found'}
                const passwordInput = password
                const passwordUser = user.password
                const isPassword = check(passwordInput, passwordUser)
                if (!isPassword) throw {message: 'invalid name/email/password'}
                let payload = {
                    _id: user._id,
                    name: user.name,
                    email: user.email
                }
                const token = generateToken(payload)
                res.status(200).json({token, name:user.name, email: user.email})
            })
            .catch(next)
    }

    static googleSignin(req, res, next) {

        User.findOne({
            email : req.headers.email
        })
            .then((user) => {
                if (user) {
                    return user
                } else {
                    return User.create({
                    name: req.headers.name,
                    email: req.headers.email,
                    password: process.env.PRIVATE_KEY
                    })
                }
            })
            .then((user) => {
                let payload = {
                    _id : user._id,
                    name: user.name,
                    email: user.email
                }
                let token = generateToken(payload)
                res.status(200).json({token})
            })
            .catch(next)
    }

    static showOne(req, res, next) {
        const userId = req.loggedUser._id
        let userData, bmiData
        User.findById(userId)
            .then(user => {
                userData = user
                console.log(userId)
                return Bmi.find({userId}).sort('-date')
            })
            .then(bmis => {
                bmiData = bmis[0]
                res.status(200).json({userData, bmiData})
            })
            .catch(next)
    }

    static updateHeightWeight(req, res, next) {
        const obj = req.body
        const _id = req.loggedUser._id
        let bmiData
        let userData
        User.findByIdAndUpdate({_id}, obj, {new: true})
            .then(user => {
                userData = user
                const { weight, height } = user
                bmiData = weight/(height*height)
                return Bmi.create({
                    userId: userData._id,
                    bmi: bmiData,
                    date: new Date()
                })
            })
            .then(bmi => {
                res.status(200).json({userData, bmiData})
            })
            .catch(next)
    }

    static decision(req, res, next) {
        axios({
            method: 'GET',
            url: `https://yesno.wtf/api/`,
        })
        .then(result => {
            console.log(result.data)
            res.status(200).json({result: result.data})
        })
        .catch(next)
    }
}

module.exports = UserController
