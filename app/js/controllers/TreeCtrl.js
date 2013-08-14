vStudio.controllers.controller('TreeCtrl', function($scope, VqlService){

    $scope.treedata = VqlService.getData();

    $scope.$watch( 'currentNode', function( newObj, oldObj ) {
        if( $scope.currentNode && angular.isObject($scope.currentNode) ) {
            console.log( 'Node Selected!!' );
            console.log( $scope.currentNode );

        }
    }, false);
})