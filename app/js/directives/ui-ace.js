'use strict';

/* Directives */


vStudio.directives
  .directive('uiAce', function(){
  	return {
  		restrict: 'EA',
      require: '?ngModel',
  		template: '<div id="editor"></div>',
  		replace: true,
      scope: {
        change: '='
      },

  		link: function(scope, element, attrs,ngModel) {

        

  			// trigger extension
  			ace.require("ace/ext/language_tools");
  			var editor = ace.edit("editor");
  			//editor.session.setMode("ace/mode/sql");
        //editor.setTheme("ace/theme/tomorrow");

  			// enable autocompletion and snippets
  			editor.setOptions({
  			    enableBasicAutocompletion: true,
  			    enableSnippets: true
  			});

        var options, opts, acee, session, onChange;
        opts = angular.extend({}, options, scope.$eval(attrs.uiAceOptions));

        acee = editor;
        session = acee.getSession();

        onChange = function (callback) {
          return function (e) {
            var newValue = session.getValue();
            if (newValue !== scope.$eval(attrs.value) && !scope.$$phase) {

              console.log("onChange, newValue - " + newValue);
              if (angular.isDefined(ngModel)) {
                scope.$apply(function () {
                  ngModel.$setViewValue(newValue);
                });
              }

              /**
               * Call the user onChange function.
               */
               if(angular.isDefined(scope.change)){
                scope.change(e, acee);
               }
              if (angular.isDefined(callback)) {
                scope.$apply(function () {
                  if (angular.isFunction(callback)) {
                    callback(e, acee);
                  }
                  else {
                    throw new Error('ui-ace use a function as callback.');
                  }
                });
              }
            }
          };
        };

        // Boolean options
        if (angular.isDefined(opts.showGutter)) {
          acee.renderer.setShowGutter(opts.showGutter);
        }
        if (angular.isDefined(opts.useWrapMode)) {
          session.setUseWrapMode(opts.useWrapMode);
        }        
        // Basic options
        if (angular.isString(opts.theme)) {
          acee.setTheme("ace/theme/" + opts.theme);
        }
        if (angular.isString(opts.mode)) {
          session.setMode("ace/mode/" + opts.mode);
        }


        //set content
        acee.setValue(attrs.content);

        // var lines = editor.session.doc.$lines;
        // lines[0] = "set attribute 'content into line 1 - " + attrs.content;
        // lines[1] = "hard code line 2";
        // lines[2] = "hard code line 3";

        // EVENTS
        session.on('change', onChange(opts.onChange));
  		}
  	}
  });
