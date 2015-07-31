angular.module('app').controller('project.singly', function($scope, $stateParams, config, socket) {
	$scope.project = null;

	socket.on('project:get:success', function(data) {
		$scope.project = data;		
	});

	socket.emit('project:get', { id: $stateParams.projectId });	
});