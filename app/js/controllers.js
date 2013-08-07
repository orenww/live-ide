'use strict';

/* Controllers */
// google.setOnLoadCallback(function () {
//     angular.bootstrap(document.body, ['myApp.controllers']);
// });
google.load('visualization', '1', {packages: ['corechart']});

angular.module('myApp.controllers', ['googlechart.directives'/*,'ui.ace'*/]).
  controller('MyCtrl1', ['$scope', function($scope) {
  	$scope.chart = {
      "type": "PieChart",
      "displayed": true,
      "cssStyle": "height:300px; width:100%;",
      "data": {
        "cols": [
          {
            "id": "month",
            "label": "Month",
            "type": "string"
          },
          {
            "id": "laptop-id",
            "label": "Laptop",
            "type": "number"
          },
          {
            "id": "desktop-id",
            "label": "Desktop",
            "type": "number"
          },
          {
            "id": "server-id",
            "label": "Server",
            "type": "number"
          }
        ],
        "rows": [
          {
            "c": [
              {
                "v": "January"
              },
              {
                "v": 19,
                "f": "42 items"
              },
              {
                "v": 12,
                "f": "Ony 12 items"
              },
              {
                "v": 7,
                "f": "7 servers"
              }
            ]
          },
          {
            "c": [
              {
                "v": "February"
              },
              {
                "v": 13
              },
              {
                "v": 1,
                "f": "1 unit (Out of stock this month)"
              },
              {
                "v": 12
              }
            ]
          },
          {
            "c": [
              {
                "v": "March"
              },
              {
                "v": 24
              },
              {
                "v": 5
              },
              {
                "v": 11
              }
            ]
          }
        ]
      },
      "options": {
        "title": "Sales per month",
        "isStacked": "true",
        "fill": 20,
        "displayExactValues": true,
        "vAxis": {
          "title": "Sales unit",
          "gridlines": {
            "count": 10
          }
        },
        "hAxis": {
          "title": "Date"
        }
      }
    }

  }])
  .controller('MyCtrl2', ["$scope","$timeout", function($scope,$timeout) {

    // // Editor part
    // var _editor = $scope.foo;

    // $scope.getContent = function() {  
    //   var _editor = $scope.foo;
    //   var _session = _editor.getSession();
      
    //   return _session.getValue();  
    // };

    // $scope.aceModel = "SELECT column_name,column_name FROM table_name;"


    // $scope.editor = {
    //   "mode": "sql"
    // }

    // var stop = $timeout(function() {
    //     var _editor = $scope.foo;
    //     var _session = _editor.getSession();

    //     // _session.setMode("ace/mode/" + $scope.editor.mode);
    //         console.log("timeout");   

    //         _session.setOptions({
    //           enableBasicAutocompletion: true,
    //           enableSnippets: true
    //         });
    //     }, 1000);

    // // $scope.timeInMs = 0;

    // // var countUp = function() {
    // //     $scope.timeInMs+= 500;
    // //     $timeout(countUp, 500);
    // // }

    // //$timeout(countUp, 500);

    // // $scope.delay = $timeout(function(){
    // //     console.log('1 second delay') 
    // //   }, 1000);

    // // function listenToEditor() {
      
    // //   // Editor part
    // //   var _editor = $scope.foo;
      
    // //   // var b = _editor.getOptions();

    // //   var _session = _editor.getSession();

    // //   _session.setMode("ace/mode/" + "sql");

    // //   var _renderer = _editor.renderer;

    // //   // Options
    // //   //_editor.setReadOnly(true);
    // //   //_session.setUndoManager(new UndoManager());
    // //   // _renderer.setHighlightActiveLine(false);

    // //   // Events
    // //   _editor.on("changeSession", function(){  });
    // //   _session.on("change", function(){  });
    // // }
    // // setTimeout(listenToEditor, 0);
    
    // $scope.$watch('editor', function() {
    //     // do something here
    //     var _editor = $scope.foo;
      
    //     // var b = _editor.getOptions();

    //     var _session = _editor.getSession();

    //     _session.setMode("ace/mode/" + $scope.editor.mode);

    //     console.log($scope.editor.mode);
    // }, true);
  }]);