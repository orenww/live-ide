vStudio.controllers.controller('EditorCtrl', function ($scope, $routeParams, VqlService) {
		// $scope.treedata = VqlService.getData();

   if(jQuery.isEmptyObject($scope.treedata)){
      VqlService.getData().then(function(d) {
        $scope.treedata = d;

        $scope.param = VqlService.getParam();        

        $scope.selectNodeById($routeParams.vqlid);
      });
   }
    
    
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