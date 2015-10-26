/**
 * Module Dependencies
 */

var db = require('../db/database');
var wrap = require('co-monk');
var User = wrap(db.get('user'));
var passwordHash = require('password-hash');

/**
 * Expose `User`
 */

module.exports = User;

/**
 * Insert a User Document
 */

User.create = function *(payload){
	var hash = passwordHash.generate(payload.password);
	var userData = {
		email: payload.email,
		passwordHash: hash,
		createdAt: Date.now()
	};

	return yield this.insert(userData);
}

/**
 * Fetch a User Document by Email
 */

User.findByEmail = function *(email){
	return yield this.findOne({ email: email });
}

/**
 * Fetch a User Document By _id
 */

User.findBy = function *(_id){
	return yield this.findOne({ _id: _id });
}