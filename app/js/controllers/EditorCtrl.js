vStudio.controllers.controller('EditorCtrl', function($scope, $routeParams, VqlService) {
	// $scope.treedata = VqlService.getData();

	if (jQuery.isEmptyObject($scope.treedata)) {
		VqlService.getData().then(function(d) {
			$scope.treedata = VqlService.getTreeData();

			$scope.param = VqlService.getParam();

			$scope.selectNodeById($routeParams.vqlid);
		});
	}


	$scope.getContent = function() {
		// debugger;
		// var vqlId = $scope.currentNode ? $scope.currentNode.label : $routeParams.vqlId;
		if ($scope.currentNode) {
			var vqlCode = $scope.currentNode.type;
			return $scope.currentNode;
		}
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

	$scope.onEditorChange = function(e, editor) {
		console.log("e", e, "editor", editor);
		$scope.currentNode.vqls.dataSelection = editor.getValue();
	}

	$scope.selectNodeById = function(id) {
		if (!id) {
			return;
		}
		// for the editor to change
		$scope.currentNode = VqlService.getById(id);
		$scope.currentNode.selected = 'selected';
		// for the tree view
		if ($scope.treedata.selectedNode) {
			$scope.treedata.selectedNode.selected = undefined;
		}
		$scope.treedata.selectedNode = $scope.currentNode;
	}

	// $scope.selectNodeById($routeParams.vqlid);

});