'use strict';

angular
	.module('UserAuth')
	.controller('signupController',['$http', '$state', 'userService', function($http, $state, userService){
		var vm = this;

		vm.userData = {};
		vm.submit = submit;
		vm.error;

		function submit(){
			console.log('submitting user data...');
			// $http.post('http://localhost:3000/users', vm.userData).then(function(response){
			// 	console.log(response);
			// 	userService.user = response.data.user;
			// 	$state.go('home')
			// }, function(error){
			// 	console.log(error);
			// 	vm.error = error;
			// });
			userService.create(vm.userData).then(function(response){
				$state.go('home');
			}, function(error){
				vm.error = error;
			});
		}
	}])

	.controller('loginController', ['$http', '$state', 'userService', function($http, $state, userService){
		var vm = this;

		vm.userData = {};
		vm.submit = submit;
		vm.error;

		function submit(){
			console.log('loggin in...');
			// $http.post('http://localhost:3000/login', vm.userData).then(function(response){
			// 	console.log(response);
			// 	userService.user = response.data.user;
			// 	$state.go('home')
			// }, function(error){
			// 	console.log(error);
			// 	vm.error = error;
			// });
			userService.authenticate(vm.userData).then(function(response){
				$state.go('home');
			}, function(error){
				vm.error = error;
			});
		}

	}]);