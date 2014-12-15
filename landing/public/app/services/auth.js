angular.module('app').factory('auth', ['ipCookie', 'config', function(ipCookie, config) {
	var factoryUnit = {

		init: function() {
			var jwt = ipCookie('jwt');			
			if(angular.isDefined(jwt) && angular.isString(jwt)) {
				// window.location.href = config.appUrl;
			}
		}
	}

	return factoryUnit;
}]);