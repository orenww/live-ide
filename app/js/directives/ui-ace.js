'use strict';

/* Directives */
vStudio.directives
	.directive('uiAce', function(){
		return {
			restrict: 'EA',
			// require: '?ngModel',
			template: '<div id="editor"></div>',
			replace: true,
			scope: {
				change: '=',
				code: '=',
				uiAceOptions: '='
			},

			link: function(scope, element, attrs ) {

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

				var options = angular.extend({}, scope.uiAceOptions());

				var acee = editor;
				var session = acee.getSession();

				var onChange = function (e) {
					var newValue = session.getValue();
					console.log("onChange, newValue - " + newValue);
					// Call the user onChange function.
					if(angular.isDefined(scope.change)){
						scope.change(e, acee);
					}
				};

				// Boolean options
				if (angular.isDefined(options.showGutter)) {
					acee.renderer.setShowGutter(options.showGutter);
				}
				if (angular.isDefined(options.useWrapMode)) {
					session.setUseWrapMode(options.useWrapMode);
				}        
				// Basic options
				if (angular.isString(options.theme)) {
					acee.setTheme("ace/theme/" + options.theme);
				}
				if (angular.isString(options.mode)) {
					session.setMode("ace/mode/" + options.mode);
				}

				// SET CONTENT
				scope.getEditor = function() {
					return acee;
				}

				// EVENTS
				session.on('change', onChange);
			},

			controller: function ($scope) {
				// $scope.$watch('code', function (newCode, oldCode) {
				// 		console.log('newCode', newCode)
				// 		$scope.getEditor().setValue(newCode());
				// }, false);
			}
		}
	});
