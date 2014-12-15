angular.module('app').factory('socket', function($cookieStore, config, socketFactory) {

	var jwt = $cookieStore.get('jwt');

	if(jwt !== undefined) {
		var socketIo = io.connect(config.socketUrl, { 'query': 'token=' +  jwt});
	} else {
		var socketIo = io.connect(config.socketUrl);
	}

	socketIo.set('transports', [
    	'websocket',
    	'xhr-polling'
	]);

	
	socketIoFactory = socketFactory({
	    ioSocket: socketIo
	});

	return socketIoFactory;
});