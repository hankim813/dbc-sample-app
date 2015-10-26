/**
 * Module Dependencies
 */

var User = require('./model');
var passwordHash = require('password-hash');
var token = require('../helpers/token');

/**
 * POST '/users'
 * create user documents
 */

exports.create = function *(){
	var payload = this.request.body;

	// Check is User already exists
	var user = yield User.findByEmail(payload.email);

	if (!user) {
		user = yield User.create(payload);
		console.log('user created!', user);
		this.status = 201;
		this.body = { 
			user: clean(user),
			token: yield token.create(user)
		};
	} else {
		this.throw(409, 'User Already Exists');
	}
}

/**
 * POST '/login'
 * authenticate a user
 */

exports.login = function *(){
	var payload = this.request.body;

	// Check if user exists
	var user = yield User.findByEmail(payload.email);

	if (!user) {
		this.throw(401, 'Email or Password is incorrect.');
	} else {
		// If user found, authenticate password
		var authorized = passwordHash.verify(payload.password, user.passwordHash);

		if (authorized) {
			this.status = 200;
			this.body = { 
				user: clean(user),
				token: yield token.create(user)
		  };
		} else {
			this.throw(401, 'Email or Password is incorrect.');
		}
	}
}

/**
 * GET '/users/:_id'
 * fetch a user by _id
 */

exports.fetch = function *(_id){
	var user = yield User.findBy(_id);
	if (!user) {
		this.throw(404, 'User Does Not Exist.');
	} else {
		this.status = 200;
		this.body = { user: clean(user) };
	}
};

/**
 * Return client safe user data
 */

function clean (user){
	return {
		email: user.email,
		_id: user._id,
		createdAt: user.createdAt
	}
} 