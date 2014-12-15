angular.module('app').controller('signin', function($scope, $http, config) {

	$scope.userCredentials = {
		email: null,
		password: null
	}

	$scope.signin = function() {
		$http.post(config.apiUrl + '/signin', $scope.userCredentials)
			.then(function(resp) {
				console.log('ok', resp);
			}, function(resp) {
				console.log('err', resp);
			});

	}	
});