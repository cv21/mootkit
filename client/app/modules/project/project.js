var project = angular.module('project');
project.config(['$stateProvider', function($stateProvider) {
    $stateProvider
        .state('cmn.panel.projects', {
            url: '/projects',
            templateUrl: '/app/modules/projects/views/projects.html',
            controller: 'project.projects'
        });
}]);