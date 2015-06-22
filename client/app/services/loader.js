angular.module('app').factory('loader', function(config) {
    var factoryUnit = function() {
        this.$get = function() {
            return this;
        }

        this.load = function(route, action, module) {
            route.templateUrl = config.directories.modules + '/' + module + config.directories.views + '/' + action + '.html';
            route.controller = module + '.' + action;
            route.resolve = {
                load: function($q) {

                }
            }
        }
    }

    return factoryUnit;
});


//'use strict';
//
//define([], function () {
//    var routeResolver = function () {
//        this.$get = function () {
//            return this;
//        };
//        this.routeConfig = function () {
//            var viewsDirectory = '/views',
//                controllersDirectory = '/controllers',
//                modulesDirectory = '/app/modules',
//
//                setBaseDirectories = function (viewsDir, controllersDir, modulesDir) {
//                    viewsDirectory = viewsDir;
//                    controllersDirectory = controllersDir;
//                    modulesDirectory = modulesDir;
//                },
//
//                getViewsDirectory = function () {
//                    return viewsDirectory;
//                },
//
//                getControllersDirectory = function () {
//                    return controllersDirectory;
//                },
//
//                getModulesDirectory = function () {
//                    return modulesDirectory;
//                };
//
//            return {
//                setBaseDirectories: setBaseDirectories,
//                getControllersDirectory: getControllersDirectory,
//                getViewsDirectory: getViewsDirectory,
//                getModulesDirectory: getModulesDirectory
//            };
//        }();
//
//        this.route = function (routeConfig) {
//
//            var resolve = function (configObj, baseName, moduleName) {
//                    configObj.templateUrl = routeConfig.getModulesDirectory() + '/' + moduleName + routeConfig.getViewsDirectory() + '/' + baseName + '.html';
//                    configObj.controller = moduleName + '.' + baseName;
//                    configObj.resolve = {
//                        load: ['$q', '$rootScope', 'authService', '$location', function ($q, $rootScope, authService, $location) {
//                            if(configObj.access && configObj.access.login && !authService.isAuthenticated()) {
//                                return $location.redirect('/auth/signin?redirect=' + configObj.url);
//                            }
//                            var dependencies = [routeConfig.getModulesDirectory() + '/' + moduleName + routeConfig.getControllersDirectory() + '/' + baseName + '.js'];
//                            return resolveDependencies($q, $rootScope, dependencies);
//                        }],
//                        auth: ['authService', '$q', function (authService, $q) {
//                            if(!authService.done && !!authService.getAccessToken()) {
//                                var deffered = $q.defer();
//                                authService.authenticate(authService.getAccessToken(), authService.getRefreshToken()).then(
//                                    function() { deffered.resolve() },
//                                    function() { deffered.resolve() }
//                                );
//                                return deffered.promise;
//                            }
//                        }]
//                    };
//
//                    return configObj;
//                },
//                resolveController = function(configObj, name, moduleName) {
//                    configObj.controller = moduleName + '.' + name;
//                    configObj.resolve = {
//                        load: ['$q', '$rootScope', function ($q, $rootScope) {
//                            var dependencies = [routeConfig.getModulesDirectory() + '/' + moduleName + routeConfig.getControllersDirectory() + '/' + name + '.js'];
//                            return resolveDependencies($q, $rootScope, dependencies);
//                        }]
//                    };
//                    return configObj;
//                },
//                resolveElement = function (configObj) {
//                    configObj.resolve = {
//                        load: ['$q', '$rootScope', '$stateParams', '$compile', 'config', function ($q, $rootScope, $stateParams, $compile, config) {
//                            var head = angular.element(document.querySelector('head'));
//                            var link = document.createElement("link");
//                            link.type = "text/css";
//                            link.rel = "stylesheet";
//                            link.href = config.api_url + config.api_version + '/elements/' + $stateParams.elementNs + '/code/' + $stateParams.elementNs + '.css';
//                            head.append(link);
//
//                            var dependencies = [
//                                config.api_url + config.api_version + '/elements/' + $stateParams.elementNs + '/code/' + $stateParams.elementNs + '.js'
//                            ];
//
//                            $rootScope.activeElementNs = $stateParams.elementNs;
//
//                            configObj.templateUrl = config.api_url + config.api_version + '/elements/' + $stateParams.elementNs + '/code/' + $stateParams.elementNs + '.html';
//                            configObj.controller = $stateParams.elementNs;
//                            return resolveDependencies($q, $rootScope, dependencies);
//                        }]
//                    };
//                    return configObj;
//                },
//                resolveDependencies = function ($q, $rootScope, dependencies) {
//                    var defer = $q.defer();
//                    require(dependencies, function () {
//                        defer.resolve();
//                        $rootScope.$apply()
//                    });
//
//                    return defer.promise;
//                };
//
//            return {
//                resolve: resolve,
//                resolveController: resolveController,
//                resolveElement: resolveElement
//            }
//        }(this.routeConfig);
//    };
//
//    var servicesApp = angular.module('routeResolverServices', []);
//
//    //Must be a provider since it will be injected into module.config()
//    servicesApp.provider('routeResolver', routeResolver);
//});