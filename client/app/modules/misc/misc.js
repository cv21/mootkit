require(['app', 'services/loader'], function(app) {
    app.config(['$stateProvider', 'loader', function($stateProvider, loader) {
        console.log(loader);
        $stateProvider
            .state('cmn.panel.home', loader.load({ url: '^/' }, 'misc', 'home'))
            .state('cmn.panel.about', loader.load({ url: '^/about' }, 'misc', 'about'))}
    ]);
});