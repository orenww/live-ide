vStudio.controllers.controller('DropdownCtrl', function($scope, $routeParams,VqlService, VqlResultsService) {
	
    // $scope.items = [{id: 1,name: "Low"}, {id: 2,name: "Normal"}, {id: 3,name: "High"},    
    //                              {id: 4,name: "Urgent"}, {id: 5,name: "Immediate"}];

    $scope.items = [{id: 0,name: "Standard"},{id: 1,name: "1"}, {id: 2,name: "2"}, {id: 3,name: "3"},{id: 4,name: "4"}, {id: 5,name: "5"}];
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

		var vql = VqlService.getSelectionData();
		var step = item.id;

		VqlResultsService.debug(vql,step).then(function(){
			var debugData = VqlResultsService.getDebugData();
		});
	}

});