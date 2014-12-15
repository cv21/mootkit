angular.module('app').controller('topPanel', function($scope, $http, config, auth) {

	$scope.signedIn = false;
	$scope.user = auth.user;

	$scope.$watch(function() {
		return auth.user;
	}, function(newVal, oldVal) {
		if(newVal !== null) {
			$scope.signedIn = true;
			$scope.user = newVal;
		}
	})
});