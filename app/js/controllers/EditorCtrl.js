vStudio.controllers.controller('EditorCtrl', function($scope, $routeParams, VqlService) {
	// $scope.treedata = VqlService.getData();

	if (jQuery.isEmptyObject($scope.treedata)) {
		VqlService.getData().then(function(d) {
			$scope.treedata = VqlService.getTreeData();
			
			$scope.param = VqlService.getParam();

			// handle display vql prop or node
			$scope.selectNodeById($routeParams.vqlid, $routeParams.vqlprop);
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
		var newValue = editor.getValue();
		// console.log("e", e, "editor", editor);
		if ($scope.currentNode.attrSelected) {
			$scope.currentNode.vqls[$scope.currentNode.attrSelected] = newValue;
		}
		$scope.currentNode.vqls.dataSelection = newValue;
	}

	$scope.selectNodeById = function(id, prop) {
		if (!id) {
			return;
		}
		// handle property leaf selection
		if (angular.isDefined(prop)) {
			$scope.currentNode = VqlService.getById(id);
			$scope.currentNode.attrSelected = prop;
			$scope.unselectNode();
			return;
		}
		// for the editor to change
		$scope.currentNode = VqlService.getById(id);
		$scope.currentNode.selected = 'selected';
		$scope.currentNode.attrSelected = undefined;
		// for the tree view
		$scope.unselectNode();
		$scope.treedata.selectedNode = $scope.currentNode;
	}

	$scope.unselectNode = function () {
		if ($scope.treedata.selectedNode) {
			$scope.treedata.selectedNode.selected = undefined;
		}
	}

	// $scope.selectNodeById($routeParams.vqlid);

});