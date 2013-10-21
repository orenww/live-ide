vStudio.controllers.controller('EditorCtrl', function($scope, $rootScope, $routeParams, VqlService, AceSnippetsExtensionService, AceIntellisenseExtensionService,VqlResultsService, Registry, ChangesTracker) {
	
	var editor = {};

	$scope.getContent = function() {
		$scope.currentNode = VqlService.getSelectedNode();
		var data = {};
		if ($scope.currentNode && $scope.currentNode.node && $scope.currentNode.node.id) {

			var currentNode = $scope.currentNode;
			var node = currentNode.node;
			data.code = currentNode.isAttr && angular.isDefined(currentNode.attrKey) ? 
				node.vqls[currentNode.attrKey] :
				node.vqls.dataSelection;

			// currently, "actions" attribute holds json
			// so it needs to be stringify
			if (currentNode.attrKey === "actions") {
				data.code = "CURRENTLY SHOWING 'code.onClick' value: " + data.code.onClick;
			}
			data.id = node.id;
			return data.code;
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
		// $scope.editor = editor;

		if(!$scope.currentNode || jQuery.isEmptyObject($scope.currentNode)){
			return;
		}
		var newValue = editor.getValue();
		var currentNode = $scope.currentNode;
		var node = currentNode.node;
		// don't track changes if node's were switched
		// triggered in case the user selected a different
		// node in the tree view
		// if (currentNode.prevNode.id && node.id !== currentNode.prevNode.id) {
		// 	return;
		// }

		if (currentNode.isAttr) {
			//  TODO - currently a hack - since actions is an object
			// if (currentNode.attrKey === "actions") {
			// 	return;
			// }
			node.vqls[currentNode.attrKey] = newValue;
		} else {
			//OWOW
			if(node.vqls){
				node.vqls.dataSelection = newValue;				
			}
		}
		// VqlService.trackChanges(currentNode, newValue);
		ChangesTracker.track(currentNode, newValue);
		// console.log(VqlService.getChanges());
	}
	$scope.changedNodes = ChangesTracker.all();
	
	$scope.onResize = function (paneName, paneElement) {
		// console.log("EditorCtrl - " + paneName);
		Registry.setLayout(paneName);

		$scope.editor.resize(true);

	};
	
	$scope.resize = Registry.getLayout;
 	// $scope.$watch('resize()', function(newValue, oldValue){
 	// 		console.log('app changed to:', newValue);
 	// });

 	
	$scope.onEditorLoaded = function(editorInstance){
		editor = editorInstance;
		AceSnippetsExtensionService.loadSnippets();
		AceIntellisenseExtensionService.loadIntellisense();
	}
});