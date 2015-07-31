angular.module('profile').controller('profile.join', function($scope, $http, ipCookie, config, $location) {
	$scope.userCredentials = {
		email: null,
		password: null
	};

	$scope.join = function() {
		$http.post(config.apiUrl + '/join', $scope.userCredentials)
			.then(function(resp) {				
				ipCookie('jwt', resp.data.jwt, {
					'domain': '.' + config.host
				});
                $location.url('/projects');
			}, function(resp) {
				console.log('err', resp);
			});
	}	
});