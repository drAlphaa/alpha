function errorHandler(err, req, res, next) {
    console.log('masuk err')
    let status, message, error = []
    console.log(err)

    if (err.name === 'ValidationError') {
        status = 400
        for (let key in err.errors) {
            error.push(err.errors[key].message)
        }
    } else if (err.name === 'CastError') {
        status = 404
        error.push('Data not found')
    } else {
        status = 400
        error.push(err.message)
    }

    res.status(status).json({error})

}

module.exports = errorHandler