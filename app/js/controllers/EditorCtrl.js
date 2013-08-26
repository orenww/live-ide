vStudio.controllers.controller('EditorCtrl', function ($scope, $routeParams, VqlService) {
		$scope.treedata = VqlService.getData();

    VqlService.getDataHttp().then(function(d) {
      $scope.treedata = d;
      $scope.selectNodeById($routeParams.vqlid);
    });

    // var resultsPromise = VqlService.getDataHttp();
    // $scope.treedata = resultsPromise; // for real-time display update....

    // resultsPromise.then( function( results) {
    //   // ...for getting it as a simple Array
    //   $scope.treedata = results;

    //   $scope.getContent();
    // });

    //$scope.treedata = VqlService.fetch();
    
		$scope.getContent = function() {
			// debugger;
			// var vqlId = $scope.currentNode ? $scope.currentNode.label : $routeParams.vqlId;
      if($scope.currentNode){
        var vqlCode = $scope.currentNode.label;
        return $scope.currentNode;        
      }
		}

		$scope.getEditorOptions = function () {
			return {
				useWrapMode : true,
				showGutter: true,
				theme:'twilight',
				mode: 'vql',
				fontSize: "14px"
			};
		}

		$scope.onEditorChange = function(e, editor){
			//console.log("e", e, "editor", editor);
		}

		$scope.selectNodeById = function(id) {
			if(!id) {
				return;
			}
			$scope.currentNode = VqlService.getById(id);
		}

		// $scope.selectNodeById($routeParams.vqlid);
		
	});