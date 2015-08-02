require(['app'], function(app) {
    app.factory('socket', function(ipCookie, config, socketFactory) {

        var jwt = ipCookie('jwt');

        if(jwt !== undefined) {
            var socketIo = io.connect(config.apiUrl, {
                'query': 'token=' +  jwt,
                'transports': [
                    'websocket',
                    'xhr-polling'
                ]
            });
        } else {
            var socketIo = io.connect(config.apiUrl);
        }

        socketIoFactory = socketFactory({
            ioSocket: socketIo
        });

        return socketIoFactory;
    });
})