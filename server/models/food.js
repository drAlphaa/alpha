const mongoose = require('mongoose')
const { Schema } = mongoose

const foodSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name is required']
    },
    calorie: {
        type: Number,
        required: [true, 'calorie is required']
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: Date,
        required: [true, 'date is required']
    }
}, {versionKey: false})

const Food = mongoose.model('Food', foodSchema)

module.exports = Food