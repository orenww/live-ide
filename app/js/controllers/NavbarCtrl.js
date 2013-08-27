vStudio.controllers.controller('NavbarCtrl', function($scope, $routeParams, VqlService) {
	// $scope.treedata = VqlService.getData();
	$scope.inSaveMode = false;
	
	$scope.saveCode = function() {
		VqlService.save();

	}

});