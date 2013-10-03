vStudio.controllers.controller('SchemaCtrl', function ($scope, AceSnippetsExtensionService, AutoCompleteService) {

  $scope.getSchema = function() {

    var schemaObject = {};

    var schemaObject = AutoCompleteService.getSchema();

    return schemaObject;    
  };

  $scope.expandTable = function(){
  	console.log("expandTable");
  } 
});