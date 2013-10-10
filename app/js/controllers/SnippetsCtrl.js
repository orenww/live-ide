vStudio.controllers.controller('SnippetsCtrl', function ($scope, AceSnippetsExtensionService, AutoCompleteService) {
  
  $scope.snippetsObject = {};

  $scope.getSnippets = function() {         

    var serverSnippetsObj = AutoCompleteService.getSnippets();
    if(serverSnippetsObj){
      $scope.snippetsObject = serverSnippetsObj;      
    }
    
    var editorsSnippetsArray = AceSnippetsExtensionService.getEditorSnippets();

    if($scope.snippetsObject){
      angular.forEach(editorsSnippetsArray, function(value, key){
        $scope.snippetsObject[key] = value;
      });          
    }

    return $scope.snippetsObject;
  }; 
});