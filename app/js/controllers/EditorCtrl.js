vStudio.controllers.controller('EditorCtrl', function($scope, $rootScope, $routeParams, VqlService, AceSnippetsExtensionService, AceIntellisenseExtensionService,VqlResultsService, Registry) {
	
	$scope.editor = {}
	$scope.getContent = function() {
		$scope.currentNode = VqlService.getSelectedNode();

		if ($scope.currentNode && $scope.currentNode.node && $scope.currentNode.node.id) {

			var currentNode = $scope.currentNode;
			var node = currentNode.node;
			var code = currentNode.isAttr && angular.isDefined(currentNode.attrKey) ? 
				node.vqls[currentNode.attrKey] :
				node.vqls.dataSelection;

			// currently, "actions" attribute holds json
			// so it needs to be stringify
			if (currentNode.attrKey === "actions") {
				code = "CURRENTLY SHOWING 'code.onClick' value: " + code.onClick;
			}
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
		var currentNode = $scope.currentNode;
		var node = currentNode.node;
		// console.log("e", e, "editor", editor);
		if (currentNode.isAttr) {
			//  TODO - currently a hack - since actions is an object
			if (currentNode.attrKey === "actions") {
				return;
			}
			node.vqls[currentNode.attrKey] = newValue;
		}else{
			node.vqls.dataSelection = newValue;
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

 	
 	$scope.onEditorLoaded = function(){ 	
 		AceSnippetsExtensionService.loadSnippets();

 		AceIntellisenseExtensionService.loadIntellisense();
 	}
});