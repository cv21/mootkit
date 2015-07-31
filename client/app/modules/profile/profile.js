require(['angular'], function RegProfile() {
    angular
        .module('profile', [])
        .config(['$stateProvider', 'loader', function($stateProvider, loader) {
            $stateProvider
                .state('cmn.panel.login', loader.load({
                    url: '^/login'
                }, 'profile', 'login'))
                .state('cmn.panel.join', loader.load({
                    url: '^/join'
                }, 'profile', 'join'))}
        ])
});