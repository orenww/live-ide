vStudio.controllers.controller('SchemaCtrl', function ($scope, AutoCompleteService) {

  $scope.schemaObject = {};

  $scope.getSchema = function() {    

    var serverSchemaObj = AutoCompleteService.getSchema();
    if(serverSchemaObj){

    	angular.forEach(serverSchemaObj, function(value, key){
      		serverSchemaObj[key]["id"] = key;
    	}); 

    	$scope.schemaObject = serverSchemaObj;    	
    }

    return $scope.schemaObject;    
  };
});