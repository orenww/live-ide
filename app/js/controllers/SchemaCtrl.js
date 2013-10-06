vStudio.controllers.controller('SchemaCtrl', function ($scope, AutoCompleteService) {

	$scope.schema= {};
  $scope.getSchema = function() {

    var schemaObject = {};

    var schemaObject = AutoCompleteService.getSchema();

    $scope.schema = schemaObject;    
  };  
  
  $scope.getSchema();
});