require(['angular'], function() {
    angular
        .module('misc', [])
        .config(['$stateProvider', 'loader', function($stateProvider, loader) {
            $stateProvider
                .state('cmn.panel.home', loader.load({
                    url: '^/'
                }, 'misc', 'home'))
                .state('cmn.panel.about', loader.load({
                    url: '^/about'
                }, 'misc', 'about'))}
        ])
});