define('misc', ['angular'], function(angular) {
    var misc = angular.module('misc', []);
    misc.config(['$stateProvider', 'loader', function($stateProvider, loader) {
        $stateProvider
            .state('cmn.panel.home', loader.load({
                url: '^/'
            }, 'misc', 'home'))
            .state('cmn.panel.about', loader.load({
                url: '^/about'
            }, 'misc', 'about'))}
    ]);
    return misc;
});