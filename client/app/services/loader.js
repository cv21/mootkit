/*
 * The Loader loads all neccessary files for any module
 */
define('services/loader', ['app'], function(app) {    //Must be a provider since it will be injected into module.config()
    var loader = app.provider('loader', function(config) {
        this.$get = function(){ return this };
        this.load = function(route, module, action) {
            console.log(route, module, action);
            route.templateUrl = '/modules/' + module + '/views/' + action + '.html';
            route.controller = module + '.' + action;
            route.resolve = {
                load: function($q, $rootScope) {
                    var defer = $q.defer();
                    require('modules/' + module + '/controller' + action + '.js', function () {
                        defer.resolve();
                        $rootScope.$apply();
                    });
                    return defer.promise;
                }
            }
        }
    });
    return loader;
});
