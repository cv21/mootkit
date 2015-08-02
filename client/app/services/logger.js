require(['app'], function(app) {
    app.factory('logger', function() {
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