angular.module('project').controller('project.list', function ($scope, config, socket) {
    $scope.projects = null;

    socket.on('project:query:success', function (data) {
        $scope.projects = data;
    });

    socket.emit('project:query');
});