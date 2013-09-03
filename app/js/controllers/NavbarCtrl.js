vStudio.controllers.controller('NavbarCtrl', function($scope, $routeParams, VqlService, AceExtentionService) {
	// $scope.treedata = VqlService.getData();
	$scope.inSaveMode = false;
	
	$scope.saveCode = function() {
		VqlService.save();

	}

	$scope.saveSnippet = function() {
		AceExtentionService.loadSnippets();

		AceExtentionService.loadKeywords();
	}

});