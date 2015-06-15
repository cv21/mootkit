angular.module('app').controller('home', function($scope, $http, config, ipCookie) {
	$scope.userCredentials = {
		email: null,
		password: null
	};

    $scope.join = function() {
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

	$scope.email = null;
	$scope.emailSended = false;
	$scope.emailExist = false;	
	$scope.readyToTry = false;
});