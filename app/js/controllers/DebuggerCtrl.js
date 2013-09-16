vStudio.controllers.controller('DebuggerCtrl', function($scope, $routeParams,VqlService, VqlResultsService) {
	
	$scope.direction = "fromStart";
	$scope.numOfSteps = 10;

	

	$scope.debug = function() {
		console.log("debug function");


		var vql = VqlService.getSelectionData();
		var step = $scope.numOfSteps;
		var direction = $scope.direction;

		VqlResultsService.debug(vql,step).then(function(){
			var debugData = VqlResultsService.getDebugData();
		});
	}

});