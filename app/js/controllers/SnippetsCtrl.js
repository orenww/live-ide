vStudio.controllers.controller('SnippetsCtrl', function ($scope, AceSnippetsExtensionService, AutoCompleteService) {
  
  $scope.search = "";

  $scope.array = [];

  $scope.isGotEditorSnippets = false;

  $scope.getSnippets = function() {

    var snippetsObject = {};

    var serverSnippetsObj = AutoCompleteService.getSnippets();    
    
    var editorsSnippetsArray = AceSnippetsExtensionService.getEditorSnippets();

    
    if(editorsSnippetsArray != null && !$scope.isGotEditorSnippets){
      $scope.array = $scope.array.concat(serverSnippetsObj,editorsSnippetsArray);
      $scope.isGotEditorSnippets = true;
    }

    return $scope.array;  
  };

  // $scope.search = "";

  // $scope.array = [];

  // $scope.isGotEditorSnippets = false;
  // $scope.isGotServerSnippets = false;

  // $scope.getSnippets = function() {

  //   var snippetsObject = {};

  //   var serverSnippetsObj = AutoCompleteService.getSnippets();
  //   //return serverSnippetsObj;

  //   // if(serverSnippetsObj){
  //   //   snippetsObject = serverSnippetsObj;      
  //   // }
    
  //   $scope.snippetsArr = AceSnippetsExtensionService.getEditorSnippets();

  //   // if(snippetsObject){
  //   //   angular.forEach(editorsSnippetsArray, function(value, key){
  //   //     snippetsObject[key] = value;
  //   //   });          
  //   // }



  //   if($scope.snippetsArr != null && !$scope.isGotEditorSnippets){
  //     $scope.array = $scope.array.concat(serverSnippetsObj,$scope.snippetsArr);
  //     $scope.isGotEditorSnippets = true;
  //   }

  //   return $scope.array;  
  // };

  // $scope.snippetsArr = AceSnippetsExtensionService.getEditorSnippets();
  // $scope.$watch( 'snippetsArr', function (snippets, oldSnippets) {
  //   for (var i = 0; i < snippets.length; i++) {
  //     $scope.array.push(snippets[i]);
  //   };
  // }, true);

  // $scope.serverSnippets = AutoCompleteService.getSnippets();
  // $scope.$watch( 'serverSnippets', function (snippets, oldSnippets) {
  //   for (var i = 0; i < snippets.length; i++) {
  //     $scope.array.push(snippets[i]);
  //   };
  // }, true)
 
});