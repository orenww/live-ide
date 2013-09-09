vStudio.controllers.controller('AppCtrl', function($scope, $routeParams, AutoCompleteService) {

	// if (jQuery.isEmptyObject($scope.data)) {
	// 	AutoCompleteService.getData().then(function(d) {
	// 		$scope.data = AutoCompleteService.getData();
	// 	});
	// }
	// $scope.data = AutoCompleteService.getInteliData;


vStudio.controllers.controller('AppCtrl', function($scope, $routeParams, IntellisenseService) {

	if (jQuery.isEmptyObject($scope.data)) {
		IntellisenseService.getData().then(function(d) {
			$scope.data = IntellisenseService.getData();
		});
	}

});