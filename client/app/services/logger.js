require(['angular'], function() {
    angular.module('app').factory('logger', function() {
        return {
            info: function() {
                console.info(arguments);
            },
            err: function() {
                console.error(arguments);
            },
            log: function() {
                console.log(arguments);
            }
        }
    });
})