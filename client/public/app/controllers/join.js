angular.module('app').controller('join', function($scope, $http, ipCookie, config) {

	$scope.userCredentials = {
		email: null,
		password: null
	};

	$scope.join = function() {
		$http.post(config.apiUrl + '/join', $scope.userCredentials)
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