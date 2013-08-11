'use strict';

/* Directives */


angular.module('myApp.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }])
  .directive('uiAce', function(){
  	return {
  		restrict: 'EA',
  		template: '<div id="editor"></div>',
  		replace: true,

  		link: function(scope, element, attrs) {
  			// trigger extension
  			ace.require("ace/ext/language_tools");
  			var editor = ace.edit("editor");
  			editor.session.setMode("ace/mode/sql");
        editor.setTheme("ace/theme/tomorrow");
  			// enable autocompletion and snippets
  			editor.setOptions({
  			    enableBasicAutocompletion: true,
  			    enableSnippets: true
  			});

        var aaa = editor.session.doc.$lines;
        aaa[0] = attrs.text;
  		}
  	}
  });
