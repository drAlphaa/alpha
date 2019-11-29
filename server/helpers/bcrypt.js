const bcrypt = require('bcryptjs')

function hash(password) {
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)
    return hash
}

function check(passwordInput, passwordDb) {
    return bcrypt.compareSync(passwordInput, passwordDb)
}

module.exports = {hash, check}