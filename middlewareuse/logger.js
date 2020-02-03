module.exports = logger

function logger(options) {
    var opts = options || {}

    return function _logger(req, res, next) {
        
		console.log('LOGGED: ' + opts.name)
		next()
    }
}
