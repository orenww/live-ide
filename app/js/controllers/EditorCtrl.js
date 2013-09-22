vStudio.controllers.controller('EditorCtrl', function($scope, $rootScope, $routeParams, VqlService, AceSnippetsExtensionService, AceIntellisenseExtensionService,VqlResultsService, Registry) {
	

	$scope.getContent = function() {
		$scope.currentNode = VqlService.getSelectedNode();
		// debugger;
		// var vqlId = $scope.currentNode ? $scope.currentNode.label : $routeParams.vqlId;
		if ($scope.currentNode && $scope.currentNode.id) {

			var node = $scope.currentNode;
			var code = node.attrSelected && angular.isDefined(node.attrSelected) ? 
				node.vqls[node.attrSelected] :
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
		if(!$scope.currentNode){
			return;
		}

		var newValue = editor.getValue();
		// console.log("e", e, "editor", editor);
		if ($scope.currentNode.attrSelected) {
			$scope.currentNode.vqls[$scope.currentNode.attrSelected] = newValue;
		}else{
			$scope.currentNode.vqls.dataSelection = newValue;
		}
	}
	
	// VqlResultsService.fetch().then(function(){
	// 	$scope.myData = VqlResultsService.getData();
	// });

 //    $scope.gridOptions = { data: 'myData' };
 $rootScope.$on('resize-end', function (ev, message) {
 	console.log(arguments);
 })
 	$scope.$watch(Registry.getAppSettings, function(newValue, oldValue){
 		console.log('app changed', newValue);
 	});
});