angular.module('app').controller('login', function($scope, $http, ipCookie, config) {

	$scope.userCredentials = {
		email: null,
		password: null
	}

	$scope.login = function() {
		$http.post(config.apiUrl + '/login', $scope.userCredentials)
			.then(function(resp) {				
				ipCookie('jwt', resp.data.jwt, {
					'domain': '.' + config.domain
				});
				window.location.href = config.appUrl;
			}, function(resp) {
				console.log('err', resp);
			});

	}	
});