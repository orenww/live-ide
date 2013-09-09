'use strict';

// Declare app level module which depends on all modules defined there
var vStudio = angular.module('vStudio', [
	'vStudio.filters',
	'vStudio.services',
	'vStudio.directives',
	'vStudio.controllers',
	'angularTreeview',
	'$strap.directives'
]);
vStudio.filters = angular.module('vStudio.filters', []);
vStudio.services = angular.module('vStudio.services', []);
vStudio.directives = angular.module('vStudio.directives', []);
vStudio.controllers = angular.module('vStudio.controllers', []);


// Router definitions
vStudio.config(['$routeProvider', function($routeProvider) {
	
	$routeProvider.when('/studio', {
		templateUrl: 'partials/studio.html'		
	});

	$routeProvider.when('/studio/node/:vqlid', {
		templateUrl: 'partials/studio.html'
	});

	$routeProvider.when('/studio/node/:vqlid/vql/:vqlprop', {
		templateUrl: 'partials/studio.html'
	});
	
	$routeProvider.otherwise({
		redirectTo: '/studio'
	});
 
}]);
