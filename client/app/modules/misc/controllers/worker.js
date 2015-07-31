angular.module('app').controller('misc.worker', function($scope, socket) {

	$scope.connected = false;

	socket.on('connect', function() {
		$scope.connected = true;
		angular.element(document.querySelector('.page')).css('display', 'block');
		cfpLoadingBar.complete();
	});	
});