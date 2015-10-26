'use strict';

/**
 * Cookie Service
 */

angular
	.module('Cache')
	.factory('cookieService', ['$cookies', function($cookies){

		function save (key, value){
			return $cookies.put(key, value);
		}

		function get (key){
			return $cookies.get(key);
		}

		function reset (key){
			return $cookies.remove(key);
		}

		return {
			save: save,
			get: get,
			reset: reset
		};
	}]);