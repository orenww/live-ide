vStudio.controllers.controller('DebuggerCtrl', function($scope, $routeParams,VqlService, VqlResultsService) {
	
	$scope.isFromStart = true;
	$scope.numOfSteps = 3;

	//Next
	$scope.isLastStep = false;
	$scope.isNextDisabled = true;
	$scope.currentStep = 0;


	$scope.debug = function(isNext) {
		console.log("debug function");

		var vql = VqlService.getSelectionData();

		var step;
		var isFromStart = $scope.isFromStart;

		if(isNext){
			step = $scope.currentStep;
		}else{
			step = $scope.numOfSteps;
			$scope.currentStep = step;
		}

		VqlResultsService.debug(vql,step,isFromStart	).then(function(){
			var debugResultData = VqlResultsService.getDebugData();

			$scope.isNextDisabled = debugResultData.isLastStep;
			$scope.isLastStep = debugResultData.isLastStep;

			$scope.debugVql = debugResultData.sql;

			$scope.debugState.active = true;
			
		});
	}

	$scope.run = function() {
		console.log("run function");

		var vql = VqlService.getSelectionData();

		VqlResultsService.run().then(function(){
			$scope.runResultData = VqlResultsService.getRunData();

			//$scope.gridOptions = { data: 'runResultData' };

			$scope.isNextDisabled = true;

			$scope.runState.active = true;
		});
	}

	$scope.gridOptions = { data: 'runResultData' };

	$scope.next = function() {
		console.log("next function, currentStep before next- " + $scope.currentStep);

		if($scope.isLastStep){
			//run
			$scope.run();
		}else{
			//debug
			if($scope.isFromStart == true){
				$scope.currentStep++;
			}else{
				if($scope.currentStep == 1){
					$scope.run();
					return;
				}
				$scope.currentStep--;

			}
			$scope.debug(true);
		}		

		console.log("next function, currentStep after next- " + $scope.currentStep);
	}

	$scope.getContent = function() {
		return $scope.debugVql;
		// $scope.currentNode = VqlService.getSelectedNode();
		// // debugger;
		// // var vqlId = $scope.currentNode ? $scope.currentNode.label : $routeParams.vqlId;
		// if ($scope.currentNode && $scope.currentNode.id) {

		// 	var node = $scope.currentNode;
		// 	var code = node.attrSelected && angular.isDefined(node.attrSelected) ? 
		// 		node.vqls[node.attrSelected] :
		// 		node.vqls.dataSelection;

		// 	return code;
		// }
	}

	$scope.getEditorOptions = function() {
		return {
			useWrapMode: true,
			showGutter: true,
			theme: 'twilight',
			mode: 'vql',
			fontSize: "14px"
		};
	}

	// VqlResultsService.fetch().then(function(){
	// 	$scope.myData = VqlResultsService.getData();
	// });

    // $scope.gridOptions = { data: 'myData' };

     $scope.debugState = {active: false };
     $scope.runState = {active: false };
     $scope.toggle = function () {
     	$scope.debugState.active = !$scope.debugState.active;
     }
});