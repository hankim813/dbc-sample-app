'use strict';

/**
 * Angular App
 *
 * Main module
 */

angular
	.module('app', [
		'ui.router',
		'ngStorage',
		'ngCookies',
		'UserAuth',
		'Home',
		'Users',
		'Cache'
	])

	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider){

		// Redirect all invalid routes to 
		$urlRouterProvider.otherwise('/');

		// Define states
		$stateProvider

			.state('landing', {
				url: '/',
				templateUrl: '../components/landing/index.html'
			});
	}])

	.run(['cookieService', 'userService', '$rootScope', '$location', function(cookieService, userService, $rootScope, $location){
		// init app

		// protect secure states and prevent double loggin/register
		$rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
			var loggedIn = cookieService.get('_id') && cookieService.get('token');
			var securedState = ifProtected(toState.name);

			if (securedState && !loggedIn) {
				event.preventDefault();
				console.log('You must be logged in!');
				$rootScope.$evalAsync(function(){
					return $location.path('/').replace();
				});
			} else if (loggedIn && !securedState) {
				event.preventDefault();
				console.log('You are already logged in!');
				$rootScope.$evalAsync(function(){
					return $location.path('/home').replace();
				});
			} else {
				return;
			}
		});
	}]);

/**
 * Returns whether a state is protected
 */

function ifProtected(state){
	var whiteList = ['landing', 'signup', 'login'];
	return whiteList.indexOf(state) === -1;
} 