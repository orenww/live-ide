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
  
  $scope.isAddMode = false;
  $scope.mode = "";  
  
  $scope.buttonMode = "";
  // $scope.addButtonMode = "show-button";  
  // $scope.cancelButtonMode = "hide-button";  

   $scope.toggleMode = function(){   
    if($scope.isAddMode == false){
      $scope.isAddMode = true;  
      $scope.mode = "add-snippet-show";

      $scope.buttonMode = "btn-danger";
      // $scope.addButtonMode = "hide-button";  
      // $scope.cancelButtonMode = "show-button";  
    }else{
      $scope.isAddMode = false;  
      $scope.mode = "";
      $scope.buttonMode = "";
      // $scope.addButtonMode = "hide-button";  
      // $scope.cancelButtonMode = "show-button";  
    }
  };

  $scope.addMode = function(){   
    $scope.isAddMode = true;  
    $scope.mode = "add-snippet-show";

    $scope.buttonMode = "btn-danger";
    // $scope.addButtonMode = "hide-button";  
    // $scope.cancelButtonMode = "show-button";  
  };

  //Add
  $scope.newSnippet = {};

  $scope.add = function(){ 
    var  newSnippet = {};

    $scope.isAddMode = false;
    $scope.mode = "";

    $scope.buttonMode = "";
    // $scope.addButtonMode = "show-button";  
    // $scope.cancelButtonMode = "hide-button";  
    //$scope.master = angular.copy(newSnippet);

    //$scope.newSnippet.content = "snippet " + $scope.newSnippet.name + "\n\t" + $scope.newSnippet.content + "\n";

    newSnippet.name = $scope.newSnippet.name;
    newSnippet.description = $scope.newSnippet.description;
    newSnippet.content = $scope.newSnippet.content;

    newSnippet.content = "snippet " + newSnippet.name + "\n\t" + newSnippet.content + "\n";
    // set snippet manager
    AceSnippetsExtensionService.addSnippet(newSnippet.name,newSnippet.description,newSnippet.content);  

    //Set display
    $scope.array.unshift(newSnippet);   

    //update server
    AutoCompleteService.addSnippet(newSnippet); 

    // //nullify
    nullifyNewObject();
  }

  var nullifyNewObject = function(){
    //nullify
    $scope.newSnippet.name = "";
    $scope.newSnippet.description = "";
    $scope.newSnippet.content = "";    
  }

  //Cancel
   $scope.cancel = function(){      
    $scope.isAddMode = false;
    $scope.mode = "";

    $scope.buttonMode = "";
    // $scope.addButtonMode = "show-button";  
    // $scope.cancelButtonMode = "hide-button";  

    nullifyNewObject();
  }
});