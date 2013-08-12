'use strict';

/* Controllers */

angular.module('myApp.controllers', []).
  controller('MyCtrl1', [function($scope) {
  	var editor = ace.edit("editor");
  }])
  .controller('MyCtrl2', [function() {

  }]).controller('EditorCtrl', function EditorCtrl($scope) {
    // $scope.content = "";

    // $scope.editorModel = {};
    // $scope.editorModel.alertFunction = function(e,editor){
    //   alert("call back function");
    // }

    $scope.$watch('content',function(){
      console.log("from the controller - " + $scope.content);
    });
  });