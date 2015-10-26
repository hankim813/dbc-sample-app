/**
 * User Factory
 */

angular
	.module('Users')
	.factory('userFactory', ['$http', function($http){
		var endpoint = 'http://localhost:3000';

		function create (payload){
			return $http.post(endpoint + '/users', payload);
		}

		function login (payload){
			return $http.post(endpoint + '/login', payload);
		}

		function fetch (_id){
			return $http.get(endpoint + '/users/' + _id);
		}

		return {
			create: create,
			login: login,
			fetch: fetch
		}
	}]);