/*
 * The Loader loads all neccessary files for any module
 */
require(['angular'], function() {
    angular.module('app').service('loader', function(config) {
        this.load = function(route, module, action) {
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
        return this;
    });
});
