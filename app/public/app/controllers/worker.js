angular.module('app').controller('worker', function($scope, socket) {
	
	// delete it if not dev
	$scope.connected = false;

	socket.on('connect', function() {
		$scope.connected = true;
	});	
});