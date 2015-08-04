define('app', ['angular', 'angular-ui-router', 'angular-cookie', 'cookies', 'angular-translate', 'loading-bar', 'socket'], function(angular) {
    var app = angular.module('app', [
        'ui.router',
        'chieffancypants.loadingBar',
        'ivpusic.cookie',
        'pascalprecht.translate',
        'ngCookies',
        'btford.socket-io',
    ]);

    app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $translateProvider) {
        $locationProvider.html5Mode(true);
        $urlRouterProvider.otherwise("/");

        /*
         * Use language from static .json files from /lang/ directory
         */
        $translateProvider.useStaticFilesLoader({
            prefix: '/lang/',
            suffix: '.json'
        });

        /*
         * Select lang, by default it engish
         */
        var lang = window.navigator.userLanguage || window.navigator.language || "en";
        $translateProvider.preferredLanguage(lang);

        /*
         * Use cookie as storage for translate
         */
        $translateProvider.useCookieStorage();

        /*
         * Register templates
         */
        $stateProvider
            .state('cmn', {
                abstract: true,
                templateUrl: '/app/templates/cmn.html'
            })
            .state('cmn.panel', {
                views: {
                    'top-panel': {
                        templateUrl: '/app/modules/misc/views/topPanel.html'
                    },
                    '': {
                        template: '<ui-view/>'
                    },
                    'footer': {
                        templateUrl: '/app/views/footer.html'
                    }
                }
            })
    });

    /*
     * Config as angular constant
     * TODO: remake with Grunt
     */
    app.constant('config', {
        apiUrl: '//api.mootkit.lc',
        host: 'mootkit.lc'
    });

    app.run(['$rootScope', 'cfpLoadingBar', 'auth',
        function ($rootScope, cfpLoadingBar, auth) {

            /*
             * Use events for page loading bar
             */
            $rootScope.$on('$stateChangeStart', function() {
                cfpLoadingBar.start();
            });
            $rootScope.$on('$stateChangeSuccess', function() {
                cfpLoadingBar.complete();
            });

            /*
             * Init auth mechanism, like loading cookies and verify tokens etc
             */
            auth.init();
        }]);
    return app;
});