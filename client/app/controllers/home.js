//TODO: Доделать структуру модулей

angular.module('app').controller('home', function($scope, $http, config, ipCookie, auth, $location) {
    if(auth.signedIn()) {
        $location.url('/projects');
    }

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
   				window.location.href = config.appUrl;
   			}, function(resp) {
   				console.log('err', resp);
   			});
    }
});