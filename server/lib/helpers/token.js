/**
 * Module Dependencies
 */

var jwt = require('jwt-simple');

/**
 * Creates a new JWT Token 
 */

exports.create = function *(user){
	var payload = {
		_id: user._id,
		expiration: expireIn(30)
	}
	return jwt.encode(payload, 'secret') // TODO: hide this to env var.
}

/**
 * Create expiration date
 */

function expireIn (days){
	var date = new Date();
	return date.setDate(date.getDate() + days);
}