angular.module('app').controller('projectTickets', function($scope, $stateParams, config, socket, auth) {

	$scope.ticket = {
		project: null,
		subj: null,
		messages: [],
		cX: 0,
		cY: 0
	};

	$scope.copy = angular.copy;

	$scope.tickets = [];

	socket.on('project:get:success', function() {
		socket.emit('ticket:query', {
			project_id: $scope.project._id
		});		
	});

	$scope.create = function(ticket) {
		ticket.project = $scope.project._id;
		socket.emit('ticket:create', {
			ticket: ticket
		});
	};

	socket.on('ticket:create:success', function(res) {
		console.log(res);
		$scope.tickets.push(res);
		$scope.createNew = false;
	});

	socket.on('ticket:create:error', function() {

	});

	socket.on('ticket:query:success', function(res) {
		console.log(res);
		$scope.tickets = res;
	});

	socket.on('ticket:query:error', function() {

	});

	$scope.user = auth.user;

	$scope.$watch(function() {
		return auth.user;
	}, function(newVal, oldVal) {
		if(newVal !== null) {
			$scope.signedIn = true;
			$scope.user = newVal;
		}
	});
});