vStudio.controllers.controller('SchemaCtrl', function ($scope, AceSnippetsExtensionService, AutoCompleteService) {

	$scope.schema= {};
  $scope.getSchema = function() {

    var schemaObject = {};

    var schemaObject = AutoCompleteService.getSchema();

    $scope.schema = schemaObject;    
  };

  $scope.expandTable = function(tbl){
  	console.log("expandTable",tbl);
  	// console.log("expandTable", ev);
  }
  
  $scope.getSchema();
});