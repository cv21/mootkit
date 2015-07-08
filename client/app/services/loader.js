angular.module('app').service('loader', function(config) {
    this.load = function(route, action, module) {
        route.templateUrl = config.directories.modules + '/' + module + config.directories.views + '/' + action + '.html';
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
    return this;
});