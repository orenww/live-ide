vStudio.controllers.controller('TreeCtrl', function($scope,$routeParams ,VqlService){

	//Treedata hold the data of the tree directive
	$scope.treedata = VqlService.getTreeData();

	$scope.nodeSelected = {};

	VqlService.getData().then(function(){
		VqlService.selectNodeById($routeParams.vqlid, $routeParams.vqlprop);
		$scope.nodeSelected = VqlService.getSelectedNode();
	}); 
})