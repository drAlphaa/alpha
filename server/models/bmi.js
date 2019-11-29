const mongoose = require('mongoose')
const { Schema } = mongoose

const bmiSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    bmi: {
        type: Number,
        required: true
    },
    date: Date
}, {versionKey: false})

const Bmi = mongoose.model('Bmi', bmiSchema)

module.exports = Bmi