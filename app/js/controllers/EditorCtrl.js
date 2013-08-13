vStudio.controllers.controller('EditorCtrl', function ($scope) {
    // $scope.content = "";

    // $scope.editorModel = {};
    // $scope.editorModel.alertFunction = function(e,editor){
    //   alert("call back function");
    // }

    $scope.onEditorChange = function(e, editor){
      //console.log("e", e, "editor", editor);
    }


    $scope.$watch('content',function(){
      //console.log("from the controller - " + $scope.content);
    }); 
    
  })