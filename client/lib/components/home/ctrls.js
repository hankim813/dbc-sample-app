'use strict';

angular
	.module('Home')
	.controller('homeController',['userService', '$state', '$http', function(userService, $state, $http){
		var vm = this;

		vm.user = userService.user();
		vm.logout = logout;
		vm.giphySrc;
		vm.searchGiphy = searchGiphy;

		function logout (){
			userService.reset();
			$state.go('landing');
		}
		
		function searchGiphy (){
			$http.get('http://localhost:3000/giphy/' + vm.giphyTerm).then(function(response){
				return vm.giphySrc = response.data.src;
			}, function(error){
				console.log(error);
			})
		}
	}]);