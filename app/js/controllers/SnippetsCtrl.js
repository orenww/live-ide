vStudio.controllers.controller('SnippetsCtrl', function ($scope, AceSnippetsExtensionService, AutoCompleteService) {
  
  var editor = {};

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

  $scope.isEditMode = false;
  $scope.currentMode = "read";
  $scope.changeMode = function(){
    if($scope.currentMode == "read"){
      $scope.currentMode = "edit";
      $scope.isEditMode = true;

      $scope.getContent();
      //$scope.template = $scope.templates[1];
    }else{
      $scope.currentMode = "read";
      $scope.isEditMode = false;
      //$scope.template = $scope.templates[0];
    }
  };

  $scope.templates =
    [ { name: 'template1.html', url: 'js/directives/snippets/readModeTemplate.html'}
    , { name: 'template2.html', url: 'js/directives/snippets/editModeTemplate.html'} ];
  $scope.template = $scope.templates[0];

  $scope.getContent = function() {
    //return "aaaaaaaaaaaaaaaaaaaa\nbbbbbbbbbbbbbbbbbb";
    var smText = AceSnippetsExtensionService.getSnippetManagerText();
    return smText;    
  }

  $scope.getEditorOptions = function() {
    return {
      useWrapMode: true,
      showGutter: true,
      theme: 'twilight',
      mode: 'vql',
      fontSize: "14px"
    };
  }

  $scope.onEditorLoaded = function(editorInstance){
    editor = editorInstance;
  } 

  $scope.saveSnippets = function(){
    var snippetContext = editor.getValue();
    AceSnippetsExtensionService.setSnippetManagerText(snippetContext);    
  };
});