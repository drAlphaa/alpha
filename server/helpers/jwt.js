const jwt = require('jsonwebtoken')

function generateToken(payload) {
    const token = jwt.sign(payload, process.env.PRIVATE_KEY)
    return token
}

function verifyToken(token) {
    console.log('masuk verify token')
    const decoded = jwt.verify(token, process.env.PRIVATE_KEY)
    console.log(decoded)
    return decoded
}

module.exports = {generateToken, verifyToken}