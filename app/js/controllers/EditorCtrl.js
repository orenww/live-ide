vStudio.controllers.controller('EditorCtrl', function($scope, $rootScope, $routeParams, VqlService, AceSnippetsExtensionService, AceIntellisenseExtensionService,VqlResultsService, Registry) {
	
	$scope.editor = {}
	$scope.getContent = function() {
		$scope.currentNode = VqlService.getSelectedNode();
		// debugger;
		// var vqlId = $scope.currentNode ? $scope.currentNode.label : $routeParams.vqlId;
		if ($scope.currentNode && $scope.currentNode.id) {

			var currentNode = $scope.currentNode;
			var node = currentNode.node;
			var code = node.isAttr && angular.isDefined(currentNode.attrKey) ? 
				node.vqls[currentNode.attrKey] :
				node.vqls.dataSelection;

			return code;
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
		$scope.editor = editor;

		if(!$scope.currentNode || jQuery.isEmptyObject($scope.currentNode)){
			return;
		}

		var newValue = editor.getValue();
		// console.log("e", e, "editor", editor);
		if ($scope.currentNode.isAttr) {
			$scope.currentNode.vqls[$scope.currentNode.attrKey] = newValue;
		}else{
			$scope.currentNode.vqls.dataSelection = newValue;
		}
	}

	$scope.onResize = function (paneName, paneElement) {
		console.log("EditorCtrl - " + paneName);
		Registry.setLayout(paneName);

		$scope.editor.resize(true);

	};
	
	$scope.resize = Registry.getLayout;
 	$scope.$watch('resize()', function(newValue, oldValue){
 			console.log('app changed to:', newValue);
 	});
});