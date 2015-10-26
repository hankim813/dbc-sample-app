'use strict';

angular
	.module('UserAuth')
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider){

		$stateProvider

			.state('signup', {
				url: '/signup',
				templateUrl: '../components/userAuth/signup.html',
				controller: 'signupController',
				controllerAs: 'signup'
			})

			.state('login', {
				url: '/login',
				templateUrl: '../components/userAuth/login.html',
				controller: 'loginController',
				controllerAs: 'login'
			});
	}]);