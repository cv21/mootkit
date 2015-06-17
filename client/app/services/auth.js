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
                    domain: '.' + config.domain
                });
                factoryUnit.token = token;
            }
        },

        signIn: function() {
            socket.emit('jwt:auth', {token: factoryUnit.token});

            socket.on('jwt:auth:success', function (res) {
                factoryUnit.user = res;
                if($location.host() == config.appUrl) {
                    $location.path('/projects');
                } else {
                    console.log('redirect to ' + 'http://' + config.appUrl + '/projects');
                    window.location.href = 'http://' + config.appUrl + '/projects';
                    //$location.url('http://' + config.appUrl + '/projects');
                }
                console.log('authenticated!!!!', res);
            });

            socket.on('jwt:auth:error', function (res) {
                console.log('authenticated fail', res);
            });
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