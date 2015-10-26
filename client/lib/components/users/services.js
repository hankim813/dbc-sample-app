'use strict';

/**
 * User Service
 */

angular
	.module('Users')
	.factory('userService', ['userFactory', 'cookieService', function(userFactory, cookieService){

		var user = {};

		function currentUser (){
			return user;
		}

		function reset (){
			user = {};
			cookieService.reset('_id');
			cookieService.reset('token');
		}

		function fetch(_id){
			return userFactory.fetch(_id).then(function(response){
				console.log(response);
				saveUser(response);
			}, function(error){
				console.log(error);
			});
		}

		function create (payload){
			return userFactory.create(payload).then(function(response){
				console.log(response);
				saveUser(response);
			}, function(error){
				console.log(error);
			});
		}

		function authenticate (payload){
			return userFactory.login(payload).then(function(response){
				console.log(response);
				saveUser(response);
			}, function(error){
				console.log(error);
			})
		}

		function saveUser (response){
			user = response.data.user;
			cookieService.save('_id', user._id);
			if (response.data.token) cookieService.save('token', response.data.token);
		}

		return {
			user: currentUser,
			create: create,
			authenticate: authenticate,
			reset: reset,
			fetch: fetch
		};
	}]);