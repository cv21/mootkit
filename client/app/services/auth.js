require(['angular'], function() {
    angular.module('app').factory('auth', ['$http', 'config', 'socket', 'logger', 'ipCookie', '$location', '$timeout', function($http, config, socket, logger, ipCookie, $location, $timeout) {
        var factoryUnit = {
            token: null,
            user: null,

            init: function() {
                var jwt = ipCookie('jwt');
                if(angular.isDefined(jwt) && angular.isString(jwt)) {
                    factoryUnit.setToken(jwt);
                    factoryUnit.signIn();
                }
            },

            setToken: function(token) {
                if(angular.isDefined(token) && angular.isString(token)) {
                    ipCookie('jwt', token, {
                        domain: '.' + config.host
                    });
                    factoryUnit.token = token;
                }
            },

            signIn: function() {
                socket.on('jwt:auth:success', function (res) {
                    factoryUnit.user = res;
                    if($location.url() == '/') {
                        $location.path('/projects');
                    }
                });

                socket.on('jwt:auth:error', function (res) {});

                socket.emit('jwt:auth', {token: factoryUnit.token});
            },

            makeToken: function(userCredentials) {
                socket.emit("jwt:make", userCredentials);

                socket.on("jwt:make:success", function(res) {
                    factoryUnit.setToken(res.jwt);
                    factoryUnit.signIn();
                });

                socket.on('jwt:make:error', function(res) {
                    console.log('error', res);
                });
            },

            signedIn: function() {
                return this.user !== null && angular.isDefined(this.user);
            }
        }

        return factoryUnit;
    }]);
})