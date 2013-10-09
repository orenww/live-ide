vStudio.controllers.controller('SchemaCtrl', function ($scope, AutoCompleteService) {

   $scope.getSchema = function() {

    var schemaObject = {};

    var serverSchemaObj = AutoCompleteService.getSchema();
    if(serverSchemaObj){

    	angular.forEach(serverSchemaObj, function(value, key){
      		serverSchemaObj[key]["id"] = key;
    	}); 

    	schemaObject = serverSchemaObj;    	
    }

    return schemaObject;    
  };
});