angular.module('app').controller('projectSettings', function($scope, $stateParams, config, socket) {

	$scope.updateProject = function() {
		socket.emit('project:update', {
			project: $scope.project
		})
	}

	socket.on('project:update:success', function() {
		alert('successfuly updated');
	});

	socket.on('project:update:error', function(data) {
		console.log('error', data);
		alert('error');
	});		

});