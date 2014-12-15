angular.module('app').controller('home', function($scope, $http, config) {
	$scope.userCredentials = {
		email: null,
		password: null
	}

	$scope.register = function() {
		$http.post(config.apiUrl + '/signup', $scope.userCredentials)
			.then(function(resp) {
				console.log('ok', resp);
			}, function(resp) {
				console.log('err', resp);
			});
	}
});