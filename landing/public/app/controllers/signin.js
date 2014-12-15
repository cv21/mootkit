angular.module('app').controller('signin', function($scope, $http, ipCookie, config) {

	$scope.userCredentials = {
		email: null,
		password: null
	}

	$scope.signin = function() {
		$http.post(config.apiUrl + '/signin', $scope.userCredentials)
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