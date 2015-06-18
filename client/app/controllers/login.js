angular.module('app').controller('login', function($scope, $http, ipCookie, config, $location, auth) {

	$scope.userCredentials = {
		email: null,
		password: null
	}

	$scope.login = function() {
		$http.post(config.apiUrl + '/login', $scope.userCredentials)
			.then(function(resp) {
                auth.setToken(resp.data.jwt);
                auth.signIn();
                $location.url('/projects');
			}, function(resp) {
				console.log('err', resp);
			}
        );
	}	
});