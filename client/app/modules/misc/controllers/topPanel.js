angular.module('misc').controller('misc.topPanel', function($scope, $http, config, auth) {

	$scope.signedIn = false;
	$scope.user = null;

	$scope.$watch(function() {
		return auth.signedIn();
	}, function(newVal, oldVal) {
		if(newVal !== null) {
			$scope.signedIn = auth.signedIn();
			$scope.user = auth.user;
		}
	})
});