'use strict';

// Declare app level module which depends on filters, and services
angular.module('myApp', [
	'myApp.filters', 
	'myApp.services',
	'myApp.directives',
	'myApp.controllers',
	'$strap'
	/*'ui.ace'*/
])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/charts', {templateUrl: 'partials/charts.html', controller: 'MyCtrl1'});
    $routeProvider.when('/studio', {templateUrl: 'partials/studio.html', controller: 'MyCtrl2'});
    $routeProvider.otherwise({redirectTo: '/studio'});
  }]);
