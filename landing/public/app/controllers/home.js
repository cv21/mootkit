angular.module('app').controller('home', function($scope, $http, config) {
	// $scope.userCredentials = {
	// 	email: null,
	// 	password: null
	// }

	// $scope.register = function() {
	// 	$http.post(config.apiUrl + '/signup', $scope.userCredentials)
	// 		.then(function(resp) {
	// 			console.log('ok', resp);
	// 		}, function(resp) {
	// 			console.log('err', resp);
	// 		});
	// }

	$scope.email = null;
	$scope.emailSended = false;
	$scope.emailExist = false;	
	$scope.readyToTry = false;

	$scope.signupForBeta = function() {
		if(!$scope.readyToTry) {
			$scope.readyToTry = true;
		} else {
			if(angular.isString($scope.email) && $scope.email != '') {
				$http.post(config.apiUrl + '/signup/beta', {email: $scope.email})
				.then(function(resp) {
					$scope.emailSended = true;
					$scope.emailExist = false;
				}, function(resp) {
					if(resp.data.error.code == 11000) {
						$scope.emailExist = true;
					}
				});
			}
		}
	}
});