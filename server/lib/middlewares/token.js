/**
 * Module Dependencies
 */

var jwt = require('jwt-simple');

/**
 * Authenticate token in request headers
 */

exports.authenticate = function *(next){
	var token = this.request.headers['token' || 'Token'];
	var decoded;

	if (token) decoded = yield jwt.decode(token, 'secret'); // hide this
	console.log(decoded);
	if (decoded && decoded.expiration > Date.now()) {
		console.log('token authorized!');
		yield next;
	} else {
		this.throw(401, 'Unauthorized Access');
	}
};