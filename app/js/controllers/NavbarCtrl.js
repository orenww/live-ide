vStudio.controllers.controller('NavbarCtrl', function($scope, $routeParams, VqlService, AceExtention) {
	// $scope.treedata = VqlService.getData();
	$scope.inSaveMode = false;
	
	$scope.saveCode = function() {
		VqlService.save();

	}

	$scope.saveSnippet = function() {
		AceExtention.loadSnippets();

		AceExtention.loadKeywords();
	}

});