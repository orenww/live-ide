'use strict';

/* Directives */


angular.module('myApp.directives', [])
	.directive('fmRating', function() {
  return {
    restrict: 'E',
    // scope: {
    //   symbol: '@',
    //   max: '@',
    //   readonly: '@'
    // },
    // require: 'ngModel',
    link: function(scope, element, attrs) {

	    require.config({
	      baseUrl: 'lib'
	    })
            
        require(['ace/ace', 'ace/ext/language_tools'], function aceEditor(ace) {
          var editor = ace.edit('editor'); // editor is the id of div or pre
          editor.setOptions({

              enableBasicAutocompletion: true,
              enableSnippets: true

          })
          editor.setTheme("ace/theme/monokai");
          editor.session.setMode("ace/mode/sql");
          window.editor = editor;
          window.ace = ace;
        });	

      // attrs.max = scope.max = parseInt(scope.max || 5, 10);

      // if (!attrs.symbol) {
      //   attrs.symbol = scope.symbol = '\u2605';
      // }

      // var styles = [];
      // scope.styles = styles;


      // for(var i = 0; i < scope.max; i ++) {
      //   styles.push({ 'fm-selected': false, 'fm-hover': false });
      // }

      // scope.enter = function(index) {
      //   if (scope.readonly) return;
      //   angular.forEach(styles, function(style, i) {
      //     style['fm-hover'] = i <= index;
      //   });
      // };

      // scope.leave = function(index) {
      //   if (scope.readonly) return;
      //   angular.forEach(styles, function(style, i) {
      //     style['fm-hover'] = false;
      //   });
      // };


      // // view -> model
      // scope.select = function(index) {
      //   if (scope.readonly) return;

      //   ngModel.$setViewValue((index == null) ? null : index + 1);
      //   udpateSelectedStyles(index);
      // };


      // // model -> view
      // ngModel.$render = function() {
      //   udpateSelectedStyles(ngModel.$viewValue - 1);
      // };

      // function udpateSelectedStyles(index) {
      //   if (index == null) index = -1;

      //   angular.forEach(styles, function(style, i) {
      //     style['fm-selected'] = i <= index;
      //   });
      // }
    },
    template:
      '<div id="editor" class="span12"></div>'
  };
});