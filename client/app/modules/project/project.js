require(['angular'], function() {
    angular
        .module('project', [])
        .config(['$stateProvider', 'loader', function($stateProvider, loader) {
            $stateProvider
                .state('cmn.panel.projects', loader.load({
                    url: '^/projects'
                }, 'project', 'list'))
                .state('cmn.panel.projects.create', loader.load({
                    url: '^/projects/create'
                }, 'project', 'create'))
                .state('cmn.panel.project', loader.load({
                    url: '^/projects/:projectId'
                }, 'project', 'singly'))
                .state('cmn.panel.project.tickets', loader.load({
                    url: '^/projects/:projectId/tickets'
                }, 'project', 'tickets'))
                .state('cmn.panel.project.themes', loader.load({
                    url: '^/projects/:projectId/themes'
                }, 'project', 'themes'))
                .state('cmn.panel.project.messages', loader.load({
                    url: '^/projects/:projectId/messages'
                }, 'project', 'messages'))
                .state('cmn.panel.project.settings', loader.load({
                    url: '^/projects/:projectId/settings'
                }, 'project', 'settings'))
        }])
});