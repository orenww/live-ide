vStudio.controllers.controller('DropdownCtrl', function($scope, $routeParams, VqlService, AceSnippetsExtensionService, AceIntellisenseExtensionService,VqlResultsService) {
	
    $scope.items = [{id: 1,name: "Low"}, {id: 2,name: "Normal"}, {id: 3,name: "High"},
    
                                 {id: 4,name: "Urgent"}, {id: 5,name: "Immediate"}];
    $scope.selectedItem = 3;

    //$scope.selected_status = 3;

	$scope.getDropdownData = function() {
		return $scope.items;
	}

	$scope.getSelectedItem = function() {
		return $scope.selectedItem;
	}

	$scope.setSelectedItem = function(item) {
		$scope.selectedItem = item;
	}


	$scope.handleClick = function(item) {
		console.log(item);
		console.log($scope.selectedItem);
	}

});