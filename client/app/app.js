var app = angular.module('app', [
    'ui.router',
    'chieffancypants.loadingBar', 
    'ivpusic.cookie',
    'pascalprecht.translate',
    'ngCookies',
    'btford.socket-io'
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $translateProvider) {    
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");

    $translateProvider.useStaticFilesLoader({
        prefix: '/lang/',
        suffix: '.json'
    });

    var lang = window.navigator.userLanguage || window.navigator.language || "en";

    $translateProvider.preferredLanguage(lang);

    $translateProvider.useCookieStorage();

    $stateProvider
        .state('cmn', {
            abstract: true,
            templateUrl: "/app/templates/cmn.html"
        })
        .state('cmn.panel', {
            views: {
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
        .state('cmn.panel.home', {
          url: '/',
          templateUrl: '/app/views/home.html',
          controller: 'home'
        })
        .state('cmn.panel.login', {
          url: '/login',
          templateUrl: '/app/views/login.html',
          controller: 'login'
        })
        .state('cmn.panel.join', {
          url: '/join',
          templateUrl: '/app/views/join.html',
          controller: 'join'
        })
        .state('cmn.panel.about', {
          url: '/about',
          templateUrl: '/app/views/about.html'
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
    });

app.constant('config', {
    apiUrl: '//api.mootkit.lc',
    host: 'mootkit.lc'
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
