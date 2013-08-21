vStudio.controllers.controller('EditorCtrl', function ($scope, $routeParams, VqlService) {
		$scope.treedata = VqlService.getData();

		$scope.getContent = function() {
			// debugger;
			// var vqlId = $scope.currentNode ? $scope.currentNode.label : $routeParams.vqlId;
			var vqlCode = $scope.currentNode.label;
			return $scope.currentNode;
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
			$scope.currentNode = VqlService.getById(id || "");
		}

		$scope.selectNodeById($routeParams.vqlid);
		
	});