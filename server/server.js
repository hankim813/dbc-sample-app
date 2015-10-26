/**
 * Module Dependencies
 */

var PORT = process.env.PORT || 3000;
var koa = require('koa');
var router = require('koa-route');
var parser = require('koa-bodyparser');
var logger = require('koa-logger');
var cors = require('koa-cors');
var error = require('./lib/middlewares/error');
var token = require('./lib/middlewares/token');
var request = require('koa-request');

/**
 * Expose `app`
 */

exports = app = koa();

/**
 * Mount bodyparser, cors, && logger
 */

app.use(parser());
app.use(logger());
app.use(cors());

/**
 * Error Handling
 */

app.use(error.catch);

/**
 * Mount Public Routes
 */
var users = require('./lib/users/api');
app.use(router.post('/users', users.create));
app.use(router.post('/login', users.login));

/**
 * Moute Private Routes
 */

app.use(token.authenticate);
app.use(router.get('/users/:_id', users.fetch));
app.use(router.get('/giphy/:tag', function *(tag){
	var options = {
		url: 'http://api.giphy.com/v1/gifs/random?tag=' + tag + '&rating=pg-13&api_key=dc6zaTOxFJmzC'
	};
	var response = yield request(options);
	var res = JSON.parse(response.body);
	this.body = {
		src: res.data.image_url
	}
}));

/**
 * Listen on PORT
 */

app.listen(PORT);
console.log('Magic happens on port ' + PORT);
