var app = angular.module('app', [
    'ui.router',
    'chieffancypants.loadingBar', 
    'ivpusic.cookie',
    'btford.socket-io'
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/projects");  

    $stateProvider
        .state('cmn', {
            abstract: true,
            templateUrl: "/app/templates/cmn.html"
        })
        .state('cmn.panel', {
            views: {
                'worker': {
                    templateUrl: '/app/views/worker.html',
                    controller: 'worker'
                },
                'top-panel': {
                    templateUrl: '/app/views/top-panel.html',
                    controller: 'topPanel'
                },
                '': {
                    template: '<ui-view/>'
                },
                'footer': {
                    templateUrl: '/app/views/footer.html'
                }
            }
        })
        .state('cmn.panel.projects', {
            url: '/projects',
            templateUrl: '/app/views/projects.html',
            controller: 'projects'
        })
        .state('cmn.panel.projectsCreate', {
            url: '/projects/create',
            templateUrl: '/app/views/projectsCreate.html',
            controller: 'projectsCreate'
        })
        .state('cmn.panel.project', {
            url: '/projects/:projectId',
            templateUrl: '/app/views/project.html',
            controller: 'project'
        })
        .state('cmn.panel.project.tickets', {
            url: '^/projects/:projectId/tickets',
            templateUrl: '/app/views/tickets.html',
            controller: 'projectTickets'
        })
        .state('cmn.panel.project.messages', {
            url: '^/projects/:projectId/messages',
            templateUrl: '/app/views/messages.html',
            controller: 'projectMessages'
        })
        .state('cmn.panel.project.themes', {
            url: '^/projects/:projectId/themes',
            templateUrl: '/app/views/themes.html',
            controller: 'projectThemes'
        })
        .state('cmn.panel.project.settings', {
            url: '^/projects/:projectId/settings',
            templateUrl: '/app/views/settings.html',
            controller: 'projectSettings'
        })
        .state('cmn.panel.signin', {
            url: '/signin',
            templateUrl: '/app/views/signin.html',
            controller: 'signin'
        })
        .state('cmn.panel.about', {
            url: '/about',
            templateUrl: '/app/views/about.html'
        })
    });

app.constant('config', {
    apiUrl: '//api.mootkit.me',
    socketUrl: 'api.mootkit.me',
    domain: 'mootkit.me'
});

app.run(['$rootScope', 'cfpLoadingBar', 'auth',
    function ($rootScope, cfpLoadingBar, auth) {
        $rootScope.$on('$stateChangeStart', function() {
            cfpLoadingBar.start();
        });

        $rootScope.$on('$stateChangeSuccess', function() {
            cfpLoadingBar.complete();
        });
        auth.init();        
    }]);
