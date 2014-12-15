var app = angular.module('app', [
    'ui.router',
    'chieffancypants.loadingBar', 
    'ivpusic.cookie',
    'pascalprecht.translate',
    'ngCookies'
]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $translateProvider) {    
    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise("/");

    $translateProvider.useStaticFilesLoader({
        prefix: '/lang/',
        suffix: '.json'
    });

    var lang = window.navigator.userLanguage || window.navigator.language || "en";
    console.log(lang);
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
    apiUrl: '//api.mootkit.lc',
    appUrl: 'http://app.mootkit.lc',
    domain: 'mootkit.lc'
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
