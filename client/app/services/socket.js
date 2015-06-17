angular.module('app').factory('socket', function(ipCookie, config, socketFactory) {

    var jwt = ipCookie('jwt');

    if(jwt !== undefined) {
        var socketIo = io.connect(config.socketUrl, {
            'query': 'token=' +  jwt,
            'transports': [
                'websocket',
                'xhr-polling'
            ]
        });
    } else {
        var socketIo = io.connect(config.socketUrl);
    }

    socketIoFactory = socketFactory({
        ioSocket: socketIo
    });

    return socketIoFactory;
});