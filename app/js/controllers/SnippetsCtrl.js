vStudio.controllers.controller('SnippetsCtrl', function ($scope, AceSnippetsExtensionService, AutoCompleteService) {
  // $scope.todos = [
  //   {text:'learn angular', done:true},
  //   {text:'build an angular app', done:false}];

  $scope.getSnippets = function() {

    var snippetsObject = {};

    var serverSnippetsObj = AutoCompleteService.getSnippets();
    if(serverSnippetsObj){
      snippetsObject = serverSnippetsObj;      
    }
    
    var editorsSnippetsArray = AceSnippetsExtensionService.getEditorSnippets();

    if(snippetsObject){
      angular.forEach(editorsSnippetsArray, function(value, key){
        snippetsObject[key] = value;
      });          
    }

    return snippetsObject;    
  };
 
});