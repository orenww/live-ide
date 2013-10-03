vStudio.controllers.controller('NavbarCtrl', function($scope, $routeParams, VqlService,AceSnippetsExtensionService,AceIntellisenseExtensionService) {
	// $scope.treedata = VqlService.getData();
	$scope.inSaveMode = false;
	
	$scope.saveCode = function() {
		VqlService.save();

	}

	$scope.loadExtentions = function() {
		//AceSnippetsExtensionService.loadSnippets();

		//AceIntellisenseExtensionService.loadIntellisense();
	}

});