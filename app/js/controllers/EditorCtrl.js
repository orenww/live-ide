vStudio.controllers.controller('EditorCtrl', function ($scope, $routeParams, VqlService) {
    $scope.treedata = VqlService.getData();
    // TODO: default text - change it!
    $scope.currentNode = {
      label: "default text...."
    };

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
        mode: 'sql'
      };
    }

    $scope.onEditorChange = function(e, editor){
      console.log("e", e, "editor", editor);
    }


    $scope.$watch( 'currentNode', function( newObj, oldObj ) {
        if( $scope.currentNode && angular.isObject($scope.currentNode) ) {
            console.log( 'Node Selected!!' );
            console.log( $scope.currentNode );
          $scope.selectedNode = newObj;

        }
    }, false);
    
  })