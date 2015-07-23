angular.module('app').controller('project.create', function($scope, $location, config, socket) {
    $scope.project = {
        title: null,
        url: null,
        members: null
    }

    $scope.createProject = function() {
        socket.emit('project:create', {
            project: $scope.project
        })
    }

    socket.on('project:create:success', function() {
        $location.path('/projects');
    });

    socket.on('project:create:error', function() {

    });
});