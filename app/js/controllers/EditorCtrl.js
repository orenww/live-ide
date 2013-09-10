vStudio.controllers.controller('EditorCtrl', function($scope, $routeParams, VqlService, AceSnippetsExtensionService, AceIntellisenseExtensionService,VqlResultsService) {
	

	$scope.getContent = function() {
		$scope.currentNode = VqlService.getSelectedNode();
		// debugger;
		// var vqlId = $scope.currentNode ? $scope.currentNode.label : $routeParams.vqlId;
		if ($scope.currentNode) {
			var vqlCode = $scope.currentNode.type;
			return $scope.currentNode;
		}
	}

	$scope.getExtensions = function() {
		return [AceSnippetsExtensionService, AceIntellisenseExtensionService];
	};	

	$scope.getEditorOptions = function() {
		return {
			useWrapMode: true,
			showGutter: true,
			theme: 'twilight',
			mode: 'vql',
			fontSize: "14px"
		};
	}

	$scope.onEditorChange = function(e, editor) {
		if(!$scope.currentNode){
			return;
		}

		var newValue = editor.getValue();
		// console.log("e", e, "editor", editor);
		if ($scope.currentNode.attrSelected) {
			$scope.currentNode.vqls[$scope.currentNode.attrSelected] = newValue;
		}
		$scope.currentNode.vqls.dataSelection = newValue;
	}
	
	VqlResultsService.fetch().then(function(){
		$scope.myData = VqlResultsService.getData();
	});

    $scope.gridOptions = { data: 'myData' };

});