const { verifyToken } = require('../helpers/jwt')
const User = require('../models/user')

function authentication (req, res, next){
  try {
    let decodedToken = verifyToken(req.headers.token)
    User.findById(decodedToken._id)
      .then(user => {
        if(user){
          req.loggedUser = decodedToken
          next()
        }
        else{
          next({ status: 401, message: 'Authentication Failed' })
        }
      })
      .catch(next)
  }
  catch(err) {
    next({ status: 401, message: err })
  }
}

module.exports = { authentication }