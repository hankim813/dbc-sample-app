'use strict';

angular
	.module('Home')
	.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function ($stateProvider, $urlRouterProvider, $httpProvider){

		$httpProvider.interceptors.push(function(cookieService){
			return {
				request: function (config){
					config.headers['Token'] = cookieService.get('token');
					return config;
				}
			};
		});

		$stateProvider

			.state('home', {
				url: '/home',
				templateUrl: '../components/home/index.html',
				resolve: {
					user: function (userService, cookieService){
						return userService.fetch(cookieService.get('_id'));
					}
				},
				controller: 'homeController',
				controllerAs: 'home'
			});
	}]);