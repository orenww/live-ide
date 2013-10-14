vStudio.controllers.controller('TreeCtrl', function($scope, $location, $route, $routeParams ,VqlService, ChangesTracker){

	//Treedata hold the data of the tree directive
	$scope.treedata = VqlService.getTreeData();

	$scope.nodeSelected = {};

	$scope.changedNodes = ChangesTracker.all();

	$scope.add = function (node) {
		ChangesTracker.track(node, "new code " + new Date())
	}

	$scope.update = function (node) {
		ChangesTracker.update(node)
	}

	$scope.onNodeSelection = function (node, key) {
		VqlService.setSelectedNode(node, key);
		$scope.updateRoute(node.id, key);
	};

	VqlService.getData().then(function(){
		VqlService.selectNodeById($routeParams.vqlid, $routeParams.vqlprop);
		$scope.nodeSelected = VqlService.getSelectedNode();
	}); 

	$scope.changeNode = function () {
		VqlService.selectNodeById($scope.nodeid);
	}

	$scope.updateRoute = function (nodeId, key) {
		var url = [];
		url.push('/studio/node/');
		url.push(nodeId);
		// add the vql url parameters if a property has been selected
		if (key && key.length) {
			url.push('/vql/');
			url.push(key);
		}
		$location.path(url.join(''));
	}
	// this is a hack which prevents the controller from 
	// loading on route change
	var lastRoute = $route.current;
    $scope.$on('$locationChangeSuccess', function(event) {
        if($route.current.$$route.templateUrl === 'partials/studio.html'){ 
        // Will not load only if my view use the same controller
            $route.current = lastRoute;
        }
    });
})