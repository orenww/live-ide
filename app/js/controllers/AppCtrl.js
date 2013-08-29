vStudio.controllers.controller('AppCtrl', function($scope, $routeParams, IntellisenseService) {

	if (jQuery.isEmptyObject($scope.data)) {
		IntellisenseService.getData().then(function(d) {
			$scope.data = IntellisenseService.getData();
		});
	}
});