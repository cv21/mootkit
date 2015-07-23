angular.module('app').controller('project.settings', function($scope, $stateParams, config, socket) {

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